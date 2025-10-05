document.addEventListener('DOMContentLoaded', () => {
  const chaosModeToggle = document.getElementById('chaosModeToggle');
  chrome.storage.sync.get('chaosMode', (data) => {
    chaosModeToggle.checked = !!data.chaosMode;
  });
  chaosModeToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ chaosMode: chaosModeToggle.checked });
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, { chaosMode: chaosModeToggle.checked });
        }
    });
  });
});
