import {LabeledCheckbox} from '../../components/LabeledCheckbox';
import React from 'react';
import {Grid, TextField} from '@material-ui/core';
import browser from 'webextension-polyfill';


export const ExtraOptions = ({extras, setExtras, type}) => {
    const toExtraBool = k => {
        const _extras = {...extras};
        if (k in _extras) delete _extras[k];
        else _extras[k] = 1;
        setExtras(_extras);
    };

    const handleChangeTextField = e => {
        const _extras = {...extras};
        _extras[e.target.name] = e.target.value;
        if ('' === _extras[e.target.name]) delete _extras[e.target.name];
        setExtras(_extras);
    };

    return 'sms' === type ?
        <>
            <Grid>
                <LabeledCheckbox checked={'debug' in extras}
                                 handleChange={() => toExtraBool('debug')}
                                 label='debug'
                />

                <LabeledCheckbox
                    checked={'flash' in extras}
                    handleChange={() => toExtraBool('flash')}
                    label='flash'
                />

                <LabeledCheckbox
                    checked={'performance_tracking' in extras}
                    handleChange={() => toExtraBool('performance_tracking')}
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
        : <LabeledCheckbox
            checked={'xml' in extras}
            label='xml'
            handleChange={() => toExtraBool('xml')}
        />;

};
