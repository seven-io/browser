import LabeledCheckbox from '@/components/LabeledCheckbox'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import React, {type ChangeEvent} from 'react'
import browser from 'webextension-polyfill'

export type MessageType = 'sms' | 'voice'

type Props = {
    extras: {
        [k: string]: any
    }
    setExtras: (k: {}) => void
    type: MessageType
}

export const ExtraOptions = ({extras, setExtras, type}: Props) => {
    const toExtraBool = (k: keyof typeof extras) => {
        const _extras = {...extras}
        if (k in _extras) delete _extras[k]
        else _extras[k] = 1
        setExtras(_extras)
    }

    const handleChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
        const _extras = {...extras}
        _extras[e.target.name] = e.target.value
        if ('' === _extras[e.target.name]) delete _extras[e.target.name]
        setExtras(_extras)
    }

    if (type === 'sms') return <>
        <Grid>
            <LabeledCheckbox
                checked={'debug' in extras}
                onChange={() => toExtraBool('debug')}
                label='debug'
            />

            <LabeledCheckbox
                checked={'flash' in extras}
                onChange={() => toExtraBool('flash')}
                label='flash'
            />

            <LabeledCheckbox
                checked={'performance_tracking' in extras}
                onChange={() => toExtraBool('performance_tracking')}
                label='performance_tracking'
            />
        </Grid>

        <TextField
            inputProps={{maxLength: 100}}
            label={browser.i18n.getMessage('label')}
            name='label'
            onChange={handleChangeTextField}
            value={extras.label || ''}
        />

        <TextField
            inputProps={{maxLength: 64}}
            label={browser.i18n.getMessage('foreign_id')}
            name='foreign_id'
            onChange={handleChangeTextField}
            value={extras.foreign_id || ''}
        />
    </>

    return <LabeledCheckbox
        checked={'xml' in extras}
        label='xml'
        onChange={() => toExtraBool('xml')}
    />

}
