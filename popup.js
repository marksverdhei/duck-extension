document.getElementById('animateButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: animateDucks,
      });
    });
  });
  
  function animateDucks() {
    chrome.tabs.executeScript({ file: 'content_script.js' });
  }
  