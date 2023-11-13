import From from '@/components/From'
import Settings from '@/util/Settings'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React, {ChangeEvent} from 'react'
import browser from 'webextension-polyfill'

type Props = {
    setStateDeep: (key: keyof typeof Settings.defaults, e: ChangeEvent<HTMLInputElement>) => void
    state: typeof Settings.defaults
}

export default function VoiceOptions({setStateDeep, state}: Props) {
    return <Grid component='section' container direction='column'>
        <Typography variant='h2'>
            {browser.i18n.getMessage('voice')}
        </Typography>

        <From
            extraHelper={true}
            onChange={e => setStateDeep('voice', e as ChangeEvent<HTMLInputElement>)}
            type='voice'
            value={state.voice ? state.voice.from : ''}
        />
    </Grid>
}
