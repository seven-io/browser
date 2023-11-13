import Settings from '@/util/Settings'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React, {type ComponentProps} from 'react'
import browser from 'webextension-polyfill'

const OPTIONS: ReadonlyArray<{
    label: string
    value: typeof Settings.defaults.signaturePosition
}> = [
    {
        label: browser.i18n.getMessage('signature_position_prepend'),
        value: 'prepend',
    },
    {
        label: browser.i18n.getMessage('signature_position_append'),
        value: 'append',
    },
] as const

export default function SignaturePosition(props: ComponentProps<typeof Select>) {
    return <Select
        label={browser.i18n.getMessage('signature_position')}
        name='signaturePosition'
        {...props}
    >
        {OPTIONS.map((opt, idx) => <MenuItem key={idx} value={opt.value}>{opt.label}</MenuItem>)}
    </Select>
}
