import Grid from '@mui/material/Grid'
import React, {useEffect, useState} from 'react'
import logo from '../../img/logo.svg'
import Settings from '../../util/Settings'
import OptionsButton from './OptionsButton'
import SmsButton from './SmsButton'
import VoiceButton from './VoiceButton'

export const Popup = () => {
    const [apiKey, setApiKey] = useState('')
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        Settings.getByKey('apiKey').then(setApiKey).catch(console.error)
    }, [])

    useEffect(() => {
        setDisabled(null === apiKey)
    }, [apiKey])

    return <Grid container direction='column' sx={{alignItems: 'center', justifyContent: 'center'}}>
        <img
            alt='seven logo'
            src={logo}
            style={{marginBottom: '15px', marginTop: '15px', maxWidth: '150px'}}
        />

        <OptionsButton/>
        <SmsButton disabled={disabled} setDisabled={setDisabled}/>
        <VoiceButton disabled={disabled} setDisabled={setDisabled}/>
        {/*<PhoneCollectorButton disabled={disabled}/>*/}
    </Grid>
}
