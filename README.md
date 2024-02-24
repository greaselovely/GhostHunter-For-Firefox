# GhostHunter

## Overview
GhostHunter is a powerful browser extension designed to capture domain names during your browsing session, making it an indispensable tool for cybersecurity professionals and organizations. It seamlessly integrates with KineticLull to automate the creation and management of External Dynamic Lists (EDLs), crucial for crafting precise and effective firewall security policies.

## Key Features
- **Automatic Domain Capture:** GhostHunter continuously captures all domain names queried by the browser across all tabs, storing them in browser storage. This ensures comprehensive visibility into the domains your applications interact with, without requiring manual initiation.
- **Unfiltered Domain Collection:** To ensure the completeness of domain reporting, GhostHunter captures all queried domains without applying any filtering. This approach guarantees that security policies can be accurately tailored to include all relevant application and third-party tool domains.
- **Integration with KineticLull:** With a simple API setup, users can upload the captured domain list directly to KineticLull. This integration facilitates the swift creation of EDLs, enhancing your firewall security policies.
- **User-Friendly Interface:** Accessible via a browser toolbar icon, GhostHunter offers a straightforward UI for managing captured domains, including options to clear the list, copy it to the clipboard, or upload it to KineticLull.
- **Privacy and Security:** While GhostHunter does not encrypt the captured domain data itself, it leverages TLS (if enabled for KineticLull) for secure uploads, aligning with standard web security practices.

## Use Cases
GhostHunter excels in scenarios where understanding all domains a SaaS application communicates with is crucial. It aids in crafting security policies that allow specific access to necessary applications and their dependencies, enhancing your organization's cybersecurity posture.

## Getting Started

### Installation
1. Install GhostHunter from the Chrome Web Store or Firefox Add-ons, depending on your browser.
2. Pin the extension to your browser toolbar for easy access.

### Configuration
1. Click on the GhostHunter icon in your toolbar and select the API button.
2. Enter the FQDN of the KineticLull web server, including any non-standard ports, and your KineticLull-generated API key.
3. Save your settings to enable the Upload feature.
4. After saving your settings, click outside the GhostHunter popup window to close it. Reopen the extension by clicking its icon again to refresh the domain list and activate the buttons.

### Usage
- **View Captured Domains:** Click the GhostHunter icon to see a list of all domains captured during your session.
- **Manage Domains:** Use the provided buttons to clear the list, copy it to the clipboard, or upload it to KineticLull.

## Security and Privacy
GhostHunter is designed to provide transparency into the domains your browser queries, without additional privacy or security measures for captured data. Secure transmission via TLS is contingent on your KineticLull configuration.

## Compatibility
GhostHunter is compatible with the latest versions of Chrome and Firefox. We recommend keeping your browser updated to ensure the best performance and security of the extension. Plans to support additional browsers will be based on user demand and technical feasibility.

## Support and Contributions
For support, feature requests, or contributions, please visit our GitHub repositories.

## Feedback and Issue Reporting
We welcome your feedback and reports on any issues you encounter while using GhostHunter. This helps us make continuous improvements. Please report issues through our GitHub repositories.

