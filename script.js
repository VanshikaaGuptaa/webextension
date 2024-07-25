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
        clearInterval(timer);
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

    // Function to start a short break
    const startShortBreak = () => {
        clearInterval(timer);
        minutes = 5;
        seconds = 0;
        updateTimerDisplay();
        startTimer();
    };

    // Function to start a long break
    const startLongBreak = () => {
        clearInterval(timer);
        minutes = 15;
        seconds = 0;
        updateTimerDisplay();
        startTimer();
    };

    // Event listeners for Pomodoro Timer
    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('reset-timer').addEventListener('click', resetTimer);
    document.getElementById('short-break').addEventListener('click', startShortBreak);
    document.getElementById('long-break').addEventListener('click', startLongBreak);

    // Initialize Pomodoro Timer display
    updateTimerDisplay();

    // Fetch and display a random quote
    const fetchQuote = async () => {
        const quoteContainer = document.getElementById('quote');

        try {
            const response = await fetch('https://api.quotable.io/random');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            quoteContainer.textContent = `"${data.content}" - ${data.author}`;
        } catch (error) {
            quoteContainer.textContent = 'Error: Unable to fetch quote.';
        }
    };

    fetchQuote();
    
    // To-Do List functionality
    const todoList = document.getElementById('todo-list');
    const newTodoInput = document.getElementById('new-todo');
    const addTodoButton = document.getElementById('add-todo');

    const addTodo = (text) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const span = document.createElement('span');
        span.textContent = text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            listItem.remove();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    };

    addTodoButton.addEventListener('click', () => {
        const text = newTodoInput.value.trim();
        if (text !== '') {
            addTodo(text);
            newTodoInput.value = '';
        }
    });

    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = newTodoInput.value.trim();
            if (text !== '') {
                addTodo(text);
                newTodoInput.value = '';
            }
        }
    });
});
