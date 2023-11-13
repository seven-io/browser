import Close from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React from 'react'
import browser from 'webextension-polyfill'

export const Header = () => {
    const handleClickClose = async () => {
        await browser.runtime.sendMessage({action: 'PHONE_COLLECTOR_CLOSE'})
    }

    return <Grid container sx={{justifyContent: 'space-between'}}>
        <Typography component='h1'>
            {browser.i18n.getMessage('phone_collector')}
        </Typography>

        <Button endIcon={<Close/>} onClick={handleClickClose} variant='outlined'>
            <Typography component='span'>
                {browser.i18n.getMessage('close')}
            </Typography>
        </Button>
    </Grid>

}
