document.addEventListener('DOMContentLoaded', () => {
  const chaosModeToggle = document.getElementById('chaosModeToggle');

  // Load saved state
  chrome.storage.sync.get('chaosMode', (data) => {
    chaosModeToggle.checked = !!data.chaosMode;
  });

  // Save state on change
  chaosModeToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ chaosMode: chaosModeToggle.checked });
    // Optional: Send a message to the content script to immediately apply changes
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, { chaosMode: chaosModeToggle.checked });
        }
    });
  });
});
