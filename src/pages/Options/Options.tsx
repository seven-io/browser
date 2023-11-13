import General from '@/util/General'
import Settings from '@/util/Settings'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React, {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react'
import browser from 'webextension-polyfill'
import {GeneralOptions} from './GeneralOptions'
import SmsOptions from './SmsOptions'
import VoiceOptions from './VoiceOptions'

export default function Options() {
    const [state, setState] = useState(Settings.defaults)

    const setStateDeep = (k: keyof typeof Settings.defaults, e: ChangeEvent<HTMLInputElement>) => {
        const merge = {[k]: {[e.target.name]: e.target.value}}
        const newState = {...state, ...merge}
        setState(newState)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await Settings.setObject(state)

        await General.notify('settings_updated', 'settings_updated_title')
    }

    useEffect(() => {
        Settings.getAll().then(setState).catch(console.error)
    }, [])

    return <Box component='form' onSubmit={handleSubmit}>
        <Typography variant='h1'>
            seven {browser.i18n.getMessage('options')}
        </Typography>

        <GeneralOptions setState={setState} state={state}/>

        <SmsOptions setStateDeep={setStateDeep} state={state}/>

        <VoiceOptions setStateDeep={setStateDeep} state={state}/>

        <Button fullWidth type='submit'>
            {browser.i18n.getMessage('submit')}
        </Button>
    </Box>
}
