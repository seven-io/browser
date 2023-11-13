import Communicator from '@/util/Communicator'
import Button from '@mui/material/Button'
import React, {ComponentProps, useEffect} from 'react'
import browser from 'webextension-polyfill'

export default function VoiceButton({setDisabled, ...props}: ComponentProps<typeof Button> & {
    setDisabled: (value: boolean) => void
}) {
    useEffect(() => setDisabled(true), [])

    const handleClick = async () => {
        const communicator = new Communicator('voice')
        await communicator.dispatch({})

        setDisabled(false)
    }

    return <Button onClick={handleClick} sx={{marginBottom: '10px'}}{...props}>
        {browser.i18n.getMessage('send_voice')}
    </Button>
}
