// Get the log overlay element
const logOverlay = document.getElementById('log-overlay');

// Function to append messages to the log overlay
function appendLog(message, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.color = type === 'error' ? 'red' : 'inherit';
    logOverlay.appendChild(messageElement);
    logOverlay.scrollTop = logOverlay.scrollHeight; // Auto-scroll to the bottom
}

// Override console methods
['log', 'info', 'warn', 'error'].forEach(method => {
    const original = console[method];
    console[method] = function(...args) {
        // Call the original method
        original.apply(console, args);

        // Format the message
        const formattedMessage = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ');

        // Append message to the log overlay
        appendLog(formattedMessage, method);
    };
});
