document.addEventListener('DOMContentLoaded', function () {
    const sendButton = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input');
    const chatOutput = document.getElementById('chat-output');

    sendButton.addEventListener('click', async () => {
        const prompt = chatInput.value;

        try {
            const response = await fetch('http://localhost:3000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();
            chatOutput.textContent = data.choices[0].text;
        } catch (error) {
            chatOutput.textContent = 'Error: ' + error.message;
        }
    });
});
