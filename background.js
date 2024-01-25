chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.tabId > 0) {
      console.log("URL:", details.url);
      // Here you can add the code to track the domain
    }
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);
