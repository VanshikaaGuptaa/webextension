document.addEventListener('DOMContentLoaded', function () {
    
    const updateTimeDisplay = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        document.querySelector('.time h1').textContent = timeString;
    };

    // Update the time display every second
    setInterval(updateTimeDisplay, 1000);

    // Initial call to set the time immediately
    updateTimeDisplay();
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
        minutes = 45;
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

    // Functionality to resize widgets
    const resizableElements = document.querySelectorAll('.widget');

    resizableElements.forEach(widget => {
        const resizeHandle = widget.querySelector('.resize-handle');

        resizeHandle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            document.documentElement.addEventListener('mousemove', onMouseMove);
            document.documentElement.addEventListener('mouseup', onMouseUp);

            let startX = e.clientX;
            let startY = e.clientY;
            let startWidth = parseInt(document.defaultView.getComputedStyle(widget).width, 10);
            let startHeight = parseInt(document.defaultView.getComputedStyle(widget).height, 10);

            function onMouseMove(e) {
                widget.style.width = startWidth + e.clientX - startX + 'px';
                widget.style.height = startHeight + e.clientY - startY + 'px';
            }

            function onMouseUp() {
                document.documentElement.removeEventListener('mousemove', onMouseMove);
                document.documentElement.removeEventListener('mouseup', onMouseUp);
            }
        });
    });
    const metaWidgetButton = document.getElementById('meta-widget-button');
    const metaWidgetModal = document.getElementById('meta-widget-modal');
    const closeMetaWidget = document.getElementById('close-meta-widget');
    const widgetList = document.getElementById('widget-list');
    
    const widgets = [
        { id: 'google-calendar-widget', name: 'Google Calendar' },
        { id: 'quote-widget', name: 'Quote of the Day' },
        { id: 'google-slides-widget', name: 'Google Slides' },
        { id: 'google-spreadsheet-widget', name: 'Google Spreadsheet' },
        { id: 'pomodoro-widget', name: 'Pomodoro Timer' },
        { id: 'poll-widget-container', name: 'Poll' },
        { id: 'spotify-widget', name: 'Spotify Player' }
    ];

    const createWidgetList = () => {
        widgetList.innerHTML = '';
        widgets.forEach(widget => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = !document.getElementById(widget.id).classList.contains('hidden');
            checkbox.addEventListener('change', () => {
                const widgetElement = document.getElementById(widget.id);
                if (checkbox.checked) {
                    widgetElement.classList.remove('hidden');
                } else {
                    widgetElement.classList.add('hidden');
                }
            });
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${widget.name}`));
            widgetList.appendChild(label);
        });
    };

    metaWidgetButton.addEventListener('click', () => {
        createWidgetList();
        metaWidgetModal.style.display = 'block';
    });

    closeMetaWidget.addEventListener('click', () => {
        metaWidgetModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == metaWidgetModal) {
            metaWidgetModal.style.display = 'none';
        }
    });

    // Hide widgets initially based on previous state (optional)
    widgets.forEach(widget => {
        const widgetElement = document.getElementById(widget.id);
        if (!widgetElement.classList.contains('hidden')) {
            widgetElement.classList.remove('hidden');
        }
    });
    const recentWebsitesList = document.getElementById('recently-visited-list');
    
    // Clear the loading message
    recentWebsitesList.innerHTML = '';

    chrome.history.search({text: '', maxResults: 5}, (data) => {
        data.forEach(page => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = page.url;
            link.textContent = page.title || page.url;
            link.target = '_blank';
            listItem.appendChild(link);
            recentWebsitesList.appendChild(listItem);
        });

        if (data.length === 0) {
            const listItem = document.createElement('li');
            listItem.textContent = 'No recent websites found.';
            recentWebsitesList.appendChild(listItem);
        }
    });

     // Fetch and display the user's frequently visited websites
   const frequentWebsitesList = document.getElementById('frequenty-visited-list');
   frequentWebsitesList.innerHTML = ''; // Clear the loading message

   chrome.history.search({text: '', maxResults: 1000}, (data) => {
       const visitCounts = {};

       data.forEach(page => {
           const domain = new URL(page.url).hostname;
           if (visitCounts[domain]) {
               visitCounts[domain] += page.visitCount;
           } else {
               visitCounts[domain] = page.visitCount;
           }
       });

       const sortedVisitCounts = Object.entries(visitCounts).sort((a, b) => b[1] - a[1]);
       const topSites = sortedVisitCounts.slice(0, 5);

       topSites.forEach(([domain, count]) => {
           const listItem = document.createElement('li');
           const link = document.createElement('a');
           link.href = `http://${domain}`;
           link.textContent = `${domain} (${count} visits)`;
           link.target = '_blank';
           listItem.appendChild(link);
           frequentWebsitesList.appendChild(listItem);
       });

       if (topSites.length === 0) {
           const listItem = document.createElement('li');
           listItem.textContent = 'No frequently visited websites found.';
           frequentWebsitesList.appendChild(listItem);
       }
   });
   
   const fetchSpreadsheetData = async () => {
    const list = document.getElementById('spreadsheet-list');

    // Replace with your actual published CSV URL
    const spreadsheetId = '2PACX-1vTWc-Lh2I3p-FPj7pxUUUtN79n4e3V1ukBv_aOEkXkptkuTZVTxmoHBdhqwcHifguv-6adIYomwRr6i'; // Replace with your Spreadsheet ID
    const csvUrl = `https://docs.google.com/spreadsheets/d/e/${spreadsheetId}/pub?output=csv`;

    console.log('Fetching data from:', csvUrl); // Debugging line

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const csvText = await response.text();
        
        console.log('CSV Data:', csvText); // Debugging line

        // Parse CSV data
        const rows = csvText.split('\n').map(row => row.split(','));

        // Clear existing list items
        list.innerHTML = '';

        // Add rows to the list
        rows.forEach(row => {
            const listItem = document.createElement('li');
            listItem.textContent = row.join(' - '); // Customize how you want to join the columns
            list.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching data:', error); // Debugging line
        list.innerHTML = 'Error: Unable to fetch data.';
    }
};

fetchSpreadsheetData();

});
