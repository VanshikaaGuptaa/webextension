document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('open-notice-board').addEventListener('click', function () {
        chrome.tabs.create({ url: 'index.html' });
    });
});
