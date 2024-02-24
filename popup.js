// popup.js

document.addEventListener('DOMContentLoaded', function() {
    // Load settings and domain data when the popup is opened
    loadSettings();
    loadDomainData();

    // Toggle API settings form visibility
    document.getElementById('settingsButton').addEventListener('click', function() {
        var settingsForm = document.getElementById('apiSettings');
        settingsForm.style.display = settingsForm.style.display === 'none' ? 'block' : 'none';
    });

    // Save API settings and show the upload button
    document.getElementById('saveSettings').addEventListener('click', function() {
        var webServerAddress = document.getElementById('webServerAddress').value;
        var apiKey = document.getElementById('apiKeyInput').value;

        // Save the settings in browser.storage.local for persistence
        browser.storage.local.set({ webServerAddress: webServerAddress, apiKey: apiKey }, function() {
            console.log('Settings saved');
        });

        // Hide the settings form and show the upload button
        document.getElementById('apiSettings').style.display = 'none';
        document.getElementById('uploadButton').style.display = 'block';
    });
});

browser.runtime.sendMessage({ message: "getDomainData" }).then(response => {
    const domains = response.data;
    const container = document.getElementById('domain-list');
    container.innerHTML = domains.join('<br>');
    updateCopyButtonState(domains.length === 0);
});

document.getElementById('clearButton').addEventListener('click', function() {
    browser.runtime.sendMessage({ message: "clearDomainData" }).then(response => {
        if (response.success) {
            document.getElementById('domain-list').textContent = '';
            updateCopyButtonState(true);
            updateUploadButtonState(true);
        }
    });
});

document.getElementById('copyButton').addEventListener('click', function() {
    const domainList = document.getElementById('domain-list').innerText;
    if (domainList.trim() !== '') {
        navigator.clipboard.writeText(domainList).then(showCopyConfirmation);
    }
});

document.getElementById('uploadButton').addEventListener('click', function() {
    // Retrieve settings from browser.storage.local before attempting to upload
    browser.storage.local.get(['webServerAddress', 'apiKey'], function(result) {
        if (!result.webServerAddress || !result.apiKey) {
            alert('Please save your settings first.');
            return;
        }

        // Now that we have the settings, proceed with the upload
        var { webServerAddress, apiKey } = result;
        browser.storage.local.get({ uniqueDomains: [] }, function(result) {
            if (result.uniqueDomains.length) {
                var payload = { fqdn_list : result.uniqueDomains };
                var endpoint = `${webServerAddress}/api/submit_fqdn/`;

                fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => {
                    if (!response.ok) {
                        showUploadNoBueno();
                        return;
                    }
                    showUploadConfirmation();
                    return response.json();
                })
                .then(data => {
                    if(data) console.log('Success:', data);
                })
                .catch(error => console.error('Error:', error));
            } else {
                alert('No domains to upload.');
            }
        });
    });
});

function loadSettings() {
    browser.storage.local.get(['webServerAddress', 'apiKey'], function(result) {
        if (result.webServerAddress && result.webServerAddress.trim() !== '') {
            document.getElementById('webServerAddress').value = result.webServerAddress;
        }
        if (result.apiKey && result.apiKey.trim() !== '') {
            document.getElementById('apiKeyInput').value = result.apiKey;
        }
        // Enable the upload button if both settings are present and non-empty
        document.getElementById('uploadButton').disabled = !(result.webServerAddress && result.apiKey);
    });
}

function loadDomainData() {
    // Implement the logic to fetch and display domain data
    browser.storage.local.get({ uniqueDomains: [] }, function(result) {
        if (result.uniqueDomains && result.uniqueDomains.length > 0) {
            const container = document.getElementById('domain-list');
            container.innerHTML = result.uniqueDomains.join('<br>');
        }
    });
}

function updateCopyButtonState(isDisabled) {
    const copyButton = document.getElementById('copyButton');
    copyButton.disabled = isDisabled;
}

function updateUploadButtonState(isDisabled) {
    const uploadButton = document.getElementById('uploadButton');
    uploadButton.disabled = isDisabled;
}

function showCopyConfirmation() {
    const confirmation = document.getElementById('copy-confirmation');
    confirmation.style.display = 'inline';
    confirmation.style.opacity = '1';

    setTimeout(() => {
        confirmation.style.opacity = '0'; 
        setTimeout(() => {
            confirmation.style.display = 'none';
        }, 600); // Duration of fade out
    }, 2000); // Display time before fading
}

function showUploadConfirmation() {
    const uploadconfirmation = document.getElementById('upload-confirmation');
    uploadconfirmation.style.display = 'inline';
    uploadconfirmation.style.opacity = '1';

    setTimeout(() => {
        uploadconfirmation.style.opacity = '0'; 
        setTimeout(() => {
            uploadconfirmation.style.display = 'none';
        }, 600); // Duration of fade out
    }, 2000); // Display time before fading
}

function showUploadNoBueno() {
    const uploadnobueno = document.getElementById('upload-no-bueno');
    uploadnobueno.style.display = 'inline';
    uploadnobueno.style.opacity = '1';

    setTimeout(() => {
        uploadnobueno.style.opacity = '0'; 
        setTimeout(() => {
            uploadnobueno.style.display = 'none';
        }, 600); // Duration of fade out
    }, 2000); // Display time before fading
}

