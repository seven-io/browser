import From from '@/components/From'
import Settings from '@/util/Settings'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React, {type ChangeEvent} from 'react'

type Props = {
    setStateDeep: (key: keyof typeof Settings.defaults, e: ChangeEvent<HTMLInputElement>) => void
    state: typeof Settings.defaults
}

export default function SmsOptions({setStateDeep, state}: Props) {
    return <Grid component='section' container direction='column'>
        <Typography variant='h2'>
            SMS
        </Typography>

        <From
            extraHelper={true}
            onChange={e => setStateDeep('sms', e as ChangeEvent<HTMLInputElement>)}
            type='sms'
            value={state.sms ? state.sms.from : ''}
        />
    </Grid>
}
