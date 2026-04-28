<p align="center">
  <img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" alt="seven logo" />
</p>

<h1 align="center">seven Browser Extension</h1>

<p align="center">
  Send SMS and place text-to-speech calls directly from your browser. Includes a phone-number collector to mass-message recipients found on any web page.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-teal.svg" alt="MIT License" /></a>
  <a href="https://chrome.google.com/webstore/detail/sms77io/cljclabcjnjklhogdanmfmdmpebmcbjo"><img src="https://img.shields.io/badge/Chrome-Web%20Store-4285f4" alt="Chrome Web Store" /></a>
  <a href="https://addons.mozilla.org/en-US/firefox/addon/sms77-add-on/"><img src="https://img.shields.io/badge/Firefox-Add--ons-ff7139" alt="Firefox Add-ons" /></a>
  <img src="https://img.shields.io/badge/TypeScript-React-3178c6" alt="TypeScript React" />
</p>

---

## Features

- **Send SMS** - Compose and send SMS to one or many recipients from the toolbar popup
- **Voice Calls** - Place text-to-speech calls without leaving the browser
- **Phone Collector** - Scrape phone numbers from any web page and mass-message them - see [screenshot](_screenshots/phone_collector_sms.png)
- **Cross-browser** - Works in Chrome, Firefox, Brave, Opera and any other Chromium-based browser

## Prerequisites

- Chrome, Firefox or any Chromium-based browser
- A [seven account](https://www.seven.io/) with API key ([How to get your API key](https://help.seven.io/en/developer/where-do-i-find-my-api-key))

## Installation

### Option 1: From a marketplace (recommended)

- [Chrome Web Store](https://chrome.google.com/webstore/detail/sms77io/cljclabcjnjklhogdanmfmdmpebmcbjo)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/sms77-add-on/)

### Option 2: Manual install (developers)

#### Chrome

1. Download the latest `*.zip` from the [releases page](https://github.com/seven-io/browser/releases/latest).
2. Unpack it anywhere.
3. Open `chrome://extensions`, enable **Developer Mode**, click **Load unpacked** and select the unzipped directory.
4. Click the extension icon, open **Options** and paste your API key.

#### Firefox

1. Download the latest `*.xpi` from the [releases page](https://github.com/seven-io/browser/releases/latest).
2. Open `about:addons`, click the cog icon and pick **Install Add-on from file**.
3. Select the downloaded archive.
4. Click the extension icon, open **Preferences** and paste your API key.

## Development

```bash
npm ci
npm run dev      # builds an unpacked extension into dist/ and watches for changes
npm run build    # production build
npm run package  # creates Chrome .zip and Firefox .xpi artifacts
```

## Support

Need help? Feel free to [contact us](https://www.seven.io/en/company/contact/) or [open an issue](https://github.com/seven-io/browser/issues).

## License

[MIT](LICENSE)
