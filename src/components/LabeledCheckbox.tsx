import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import React, {type ComponentProps} from 'react'
import browser from 'webextension-polyfill'

type Props = ComponentProps<typeof Checkbox> & { label: string }

export default function LabeledCheckbox({label, ...props}: Props) {
    return <FormControlLabel
        control={<Checkbox {...props}/>}
        label={browser.i18n.getMessage(label)}
    />
}
