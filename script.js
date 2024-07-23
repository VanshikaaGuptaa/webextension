document.addEventListener('DOMContentLoaded', function () {
    // Variables for Pomodoro Timer
    let minutes = 25;
    let seconds = 0;
    let timer;

    // Function to update the Pomodoro Timer display
    const updateTimerDisplay = () => {
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    };

    // Function to start the Pomodoro Timer
    const startTimer = () => {
        timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                    alert("Pomodoro session ended!");
                    return;
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            updateTimerDisplay();
        }, 1000);
    };

    // Function to reset the Pomodoro Timer
    const resetTimer = () => {
        clearInterval(timer);
        minutes = 25;
        seconds = 0;
        updateTimerDisplay();
    };

    // Event listeners for Pomodoro Timer
    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('reset-timer').addEventListener('click', resetTimer);

    // Initialize Pomodoro Timer display
    updateTimerDisplay();

    // Poll Widget Initialization
    const pollData = [
        { question: 'What is your favorite color?', options: ['Red', 'Blue', 'Green', 'Yellow'] },
        { question: 'What is your favorite programming language?', options: ['JavaScript', 'Python', 'Java', 'C++'] }
    ];

    const initializePollWidget = () => {
        const pollContainer = document.getElementById('poll-widget-container');
        pollContainer.innerHTML = '<h2>Poll</h2>'; // Clear previous content and add title

        pollData.forEach(poll => {
            const pollQuestion = document.createElement('div');
            pollQuestion.innerHTML = `<h3>${poll.question}</h3>`;
            
            poll.options.forEach(option => {
                const optionLabel = document.createElement('label');
                optionLabel.className = 'poll-option';
                optionLabel.innerHTML = `<input type="radio" name="${poll.question}" value="${option}"> ${option}`;
                pollQuestion.appendChild(optionLabel);
                pollQuestion.appendChild(document.createElement('br'));
            });
            
            pollContainer.appendChild(pollQuestion);
        });

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit Poll';
        submitButton.addEventListener('click', () => {
            pollContainer.innerHTML = '<h2>No new poll</h2>'; // Display message after submission
        });

        pollContainer.appendChild(submitButton);
    };

    // Initialize Poll Widget
    initializePollWidget();

    // ChatGPT Widget Initialization
    const askQuestion = async () => {
        const question = document.getElementById('chat-input').value;
        const responseContainer = document.getElementById('chat-response');

        try {
            const response = await fetch('http://localhost:3000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: question })
            });

            const data = await response.json();
            responseContainer.textContent = data.choices[0].text;
        } catch (error) {
            responseContainer.textContent = 'Error: ' + error.message;
        }
    };

    document.getElementById('chat-submit').addEventListener('click', askQuestion);

    // Resizable widgets
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach(widget => {
        const resizeHandle = widget.querySelector('.resize-handle');
        resizeHandle.addEventListener('mousedown', startResizing);

        function startResizing(e) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        }

        function resize(e) {
            widget.style.width = e.clientX - widget.offsetLeft + 'px';
            widget.style.height = e.clientY - widget.offsetTop + 'px';
        }

        function stopResizing() {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        }
    });
});
