import type {MessageType} from '@/pages/PhoneCollector/ExtraOptions'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import React from 'react'
import browser from 'webextension-polyfill'

export const SetMessageType = ({setType, type}: {
    setType: (messageType: MessageType) => void
    type: MessageType
}) => <ButtonGroup
    aria-label={browser.i18n.getMessage('message_type')}
    fullWidth
    variant='contained'
>
    <Button disabled={type === 'sms'} onClick={() => setType('sms')}>
        SMS
    </Button>

    <Button disabled={type === 'voice'} onClick={() => setType('voice')}>
        {browser.i18n.getMessage('voice')}
    </Button>
</ButtonGroup>
