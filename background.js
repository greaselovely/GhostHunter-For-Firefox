// background.js

// Listener for web requests
browser.webRequest.onBeforeRequest.addListener(
  function(details) {
      let url = new URL(details.url);
      let domain = url.hostname;

      // Retrieve the current stored domains and update them
      browser.storage.local.get({ uniqueDomains: [] }, function(result) {
          let domains = new Set(result.uniqueDomains);
          domains.add(domain);

          // Save the updated list of domains
          browser.storage.local.set({ uniqueDomains: Array.from(domains) });
          // console.log("Domain added:", domain); // For debugging
      });
  },
  { urls: ["<all_urls>"] }
);

// Listen for messages from the popup
browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.message === "getDomainData") {
          browser.storage.local.get({ uniqueDomains: [] }, function(result) {
            // console.log("Sending domains:", result.uniqueDomains); // For debugging  
            sendResponse({ data: result.uniqueDomains });
          });
          return true; // Indicates that the response is asynchronous
      } else if (request.message === "clearDomainData") {
          // Clear the stored domain data
          browser.storage.local.set({ uniqueDomains: [] }, function() {
              sendResponse({ success: true });
          });
          return true; // Indicates that the response is asynchronous
      }
  }
);
