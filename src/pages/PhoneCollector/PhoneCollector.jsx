import React, {useEffect, useState} from 'react';
import browser from 'webextension-polyfill';
import {Box, Button, Container} from '@material-ui/core';
import {General} from '../../util/General';
import Settings from '../../util/Settings';
import {From} from '../../components/From';
import {SetMessageType} from './SetMessageType';
import {Header} from './Header';
import {PhoneTable} from './PhoneTable';
import {Text} from './Text';
import {ExtraOptions} from './ExtraOptions';

export const PhoneCollector = () => {
    const [disabled, setDisabled] = useState(true);
    const [from, setFrom] = useState('');
    const [phones, setPhones] = useState([]);
    const [text, setText] = useState('');
    const [toggled, setToggled] = useState([]);
    const [type, setType] = useState(null);
    const [extras, setExtras] = useState({});

    useEffect(() => {
        browser.storage.local.get('sms77browser')
            .then(({sms77browser}) => setPhones(sms77browser.collectedPhones))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (!type) return setFrom('');

        Settings.getByKey(type).then(({from}) => setFrom(from)).catch(console.error);
    }, [type]);

    useEffect(() => {
        setDisabled(!(text.length && toggled.length));
    }, [text, toggled]);

    const handleClickSend = () => {
        const opts = [text, toggled, from, extras];

        'sms' === type ? General.sendSMS(...opts) : General.sendVoice(...opts);
    };

    return <Container style={{color: '#000'}}>
        <Box>
            <Header/>

            <SetMessageType setType={setType} type={type}/>

            {
                type ? <>
                    <PhoneTable
                        phones={phones}
                        setPhones={setPhones}
                        setToggled={setToggled}
                        toggled={toggled}
                    />

                    <ExtraOptions extras={extras} setExtras={setExtras} type={type}/>

                    <From handleChange={e => setFrom(e.target.value)} type={type}
                          value={from}/>

                    <Text setText={setText} text={text} type={type}/>

                    <Button disabled={disabled} onClick={handleClickSend}>
                        {browser.i18n.getMessage('send_message')}
                    </Button>
                </> : null
            }
        </Box>
    </Container>;
};
