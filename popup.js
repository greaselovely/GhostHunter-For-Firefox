document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({ message: "getDomainData" }, function(response) {
        let domains = response.data; // This should be an array of domains
        let container = document.getElementById('domain-list');
        container.innerHTML = domains.join('<br>'); // Display domains
    });
});


function displayDomainData(data) {
    const container = document.getElementById('domain-list');
    container.innerHTML = '';

    for(let domain in data) {
        // let count = data[domain];
        let element = document.createElement('div');
        element.textContent = `${domain}`;
        container.appendChild(element);
    }
}

document.getElementById('copyButton').addEventListener('click', function() {
    copyDomainsToClipboard();
    showCopiedAlert();
});

function showCopiedAlert() {
    let alert = document.getElementById('copyAlert');
    alert.style.opacity = '1'; // Start by making the alert fully visible
    alert.style.display = 'block'; // Display the alert

    setTimeout(function() {
        alert.style.opacity = '0'; // Start fading out after a delay
        setTimeout(function() {
            alert.style.display = 'none'; // Hide the alert after the fade out
        }, 600); // This should match the duration of the CSS transition
    }, 1000); // Time the alert is fully visible
}

function copyDomainsToClipboard() {
    const domainListElement = document.getElementById('domain-list');
    const textToCopy = domainListElement.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
    });
}

