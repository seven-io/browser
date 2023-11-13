import pkg from '../package.json'

export function getManifest(browserType: string): chrome.runtime.ManifestV2 {
    const manifest: chrome.runtime.ManifestV2 = {
        author: pkg.author,
        background: {
            scripts: ['src/pages/Background/index.ts'],
        },
        browser_action: {
            default_popup: 'src/pages/Popup/index.html',
            default_icon: 'icon48.png',
        },
        content_security_policy: 'script-src \'self\'; object-src \'self\'',
        content_scripts: [
            {
                matches: ['<all_urls>'],
                js: ['src/contentScripts.ts'],
            },
        ],
        default_locale: 'en',
        description: pkg.description,
        icons: {
            16: 'icon16.png',
            19: 'icon19.png',
            32: 'icon32.png',
            38: 'icon38.png',
            48: 'icon48.png',
            64: 'icon64.png',
            96: 'icon96.png',
            128: 'icon128.png',
            256: 'icon256.png',
        },
        manifest_version: 2,
        name: '__MSG_sevenbrowser__',
        options_ui: {
            open_in_tab: true,
            page: 'src/pages/Options/index.html',
        },
        permissions: [
            'activeTab',
            'contextMenus',
            'notifications',
            'storage',
            '*://gateway.seven.io/*',
        ],
        version: pkg.version,
        web_accessible_resources: [
            'icon16.png',
            'icon19.png',
            'icon32.png',
            'icon48.png',
            'icon64.png',
            'icon96.png',
            'icon128.png',
            'icon256.png',
            'logo.svg',
            'phoneCollector.html',
        ],
    }

    switch (browserType) {
        case 'chrome':
            manifest.options_ui!.chrome_style = true
            manifest.options_ui!.open_in_tab = true
            break
        case 'firefox':
            manifest.applications = {gecko: {id: 'firefox@seven.io'}}
            manifest.developer = {
                name: 'seven communications GmbH & Co. KG',
                url: 'https://www.seven.io',
            }
            //@ts-ignore
            manifest.options_ui.browser_style = true
            break
        default:
            throw new Error(`Unknown browser type: ${browserType}`)
    }

    return manifest
}
