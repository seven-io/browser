import From from '@/components/From'
import Communicator, {type MessageOptions} from '@/util/Communicator'
import Settings from '@/util/Settings'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import React, {useEffect, useState} from 'react'
import browser from 'webextension-polyfill'
import {ExtraOptions, type MessageType} from './ExtraOptions'
import {Header} from './Header'
import {PhoneTable} from './PhoneTable'
import {SetMessageType} from './SetMessageType'
import Text from './Text'

export const PhoneCollector = () => {
    const [disabled, setDisabled] = useState(true)
    const [from, setFrom] = useState('')
    const [phones, setPhones] = useState<string[]>([])
    const [text, setText] = useState('')
    const [toggled, setToggled] = useState<string[]>([])
    const [type, setType] = useState<MessageType>('sms')
    const [extras, setExtras] = useState({})

    useEffect(() => {
        browser.storage.local.get('sevenbrowser')
            .then(({sevenbrowser}) => setPhones(sevenbrowser.collectedPhones))
            .catch(console.error)
    }, [])

    useEffect(() => {
        if (!type) return setFrom('')

        Settings.getByKey(type).then(({from}) => setFrom(from)).catch(console.error)
    }, [type])

    useEffect(() => {
        setDisabled(!(text.length && toggled.length))
    }, [
        text,
        toggled,
    ])

    return <Container sx={{color: '#000'}}>
        <Box>
            <Header/>

            <SetMessageType setType={setType} type={type}/>

            {
                type ? <>
                    <PhoneTable
                        phones={phones}
                        setPhones={setPhones}
                        setToggled={setToggled}
                        toggled={toggled}
                    />

                    <ExtraOptions extras={extras} setExtras={setExtras} type={type}/>

                    <From
                        onChange={e => setFrom(e.target.value)}
                        type={type}
                        value={from}
                    />

                    <Text setText={setText} type={type} value={text}/>

                    <Button
                        disabled={disabled}
                        onClick={async () => {
                            const opts: MessageOptions = {
                                text,
                                to: toggled.join(),
                                from,
                                extraOptions: extras,
                            }

                            const communicator = new Communicator(type)
                            await communicator.dispatch(opts)
                        }}
                    >
                        {browser.i18n.getMessage('send_message')}
                    </Button>
                </> : null
            }
        </Box>
    </Container>
}
