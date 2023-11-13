import Communicator from '@/util/Communicator'
import Valuenator from '@/util/Valuenator'
import browser from 'webextension-polyfill'
import General from './util/General'

const iframeName = 'seven_collected_phones'

browser.runtime.onMessage.addListener(async data => {
    const {action, menuItemId} = data

    if ('action' in data) switch (action) {
        case 'PHONE_COLLECTOR_CLOSE':
            document.querySelector(`iframe[name='${iframeName}']`)?.remove()
            break

        default:
            throw new Error(`Unknown action ${action}`)
    }

    else if ('menuItemId' in data) switch (menuItemId) {
        case 'collect':
            const {sevenbrowser} = await browser.storage.local.get('sevenbrowser')

            await browser.storage.local.set({
                sevenbrowser: {
                    ...(sevenbrowser || {}),
                    collectedPhones: General.collectNumbers(),
                },
            })

            // await chrome.runtime.sendMessage({action: "PHONE_COLLECTOR_OPEN"}); TODO - see Background/index.js@PHONE_COLLECTOR_OPEN

            document.querySelector('body')?.append((() => {
                const iframe = document.createElement('iframe')
                iframe.classList.add('phoneCollector')
                iframe.name = iframeName
                iframe.src = browser.runtime.getURL('phoneCollector.html')
                iframe.style.backgroundColor = '#cdcdcd'
                iframe.style.height = '100%'
                iframe.style.opacity = .9.toString()
                iframe.style.position = 'fixed'
                iframe.style.width = '100%'
                iframe.style.zIndex = Number.MAX_SAFE_INTEGER.toString()

                return iframe
            })())
            break
        case 'sms':
        case 'voice':
            const communicator = new Communicator(menuItemId)
            await communicator.dispatch({text: await Valuenator.text(data.selectionText)})
            break
        default:
            throw new Error(`Unknown menuItemId ${menuItemId}`)
    }
})
