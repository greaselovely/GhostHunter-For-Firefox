// Set to hold unique domains
let uniqueDomains = new Set();

// Listener for web requests
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        let url = new URL(details.url);
        uniqueDomains.add(url.hostname); // Add domain to set
    },
    { urls: ["<all_urls>"] }
);

// Custom sort function for domain names
function sortDomains(a, b) {
    // Extracting the last two parts of the domain
    let domainA = a.split('.').slice(-2).join('.');
    let domainB = b.split('.').slice(-2).join('.');

    if (domainA < domainB) return -1;
    if (domainA > domainB) return 1;
    return 0;
}

// Function to get the sorted unique domains
function getSortedUniqueDomains() {
    return Array.from(uniqueDomains).sort(sortDomains); // Sort using custom function
}

// Listen for a message from the popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "getDomainData") {
            sendResponse({ data: getSortedUniqueDomains() });
        }
    }
);
