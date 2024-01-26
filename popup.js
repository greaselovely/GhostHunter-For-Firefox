document.addEventListener('DOMContentLoaded', function() {
    browser.runtime.sendMessage({ message: "getDomainData" }).then(response => {
        let domains = response.data;
        let container = document.getElementById('domain-list');
        container.innerHTML = domains.join('<br>');
        updateCopyButtonState();
    });
});

document.getElementById('clearButton').addEventListener('click', function() {
    browser.runtime.sendMessage({ message: "clearDomainData" }).then(response => {
        if (response.success) {
            document.getElementById('domain-list').textContent = '';
            updateCopyButtonState();
        }
    });
});

document.getElementById('copyButton').addEventListener('click', function() {
    let domainList = document.getElementById('domain-list').innerText;
    if (!this.disabled && domainList.trim() !== '') {
        navigator.clipboard.writeText(domainList).then(showCopiedAlert);
    }
});


function updateCopyButtonState() {
    let domainList = document.getElementById('domain-list').innerText;
    let copyButton = document.getElementById('copyButton');
    copyButton.disabled = domainList.trim() === '';
}

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