//import 'material-design-lite/material.min';
import React, {useEffect, useState} from 'react';
import browser from 'webextension-polyfill';
import '../../assets/img/icon16.png';
import '../../assets/img/icon19.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import './style.css';

export const NumberCollector = () => {
    //const ref = createRef();
    const [phones, setPhones] = useState([]);

    useEffect(() => {
        (async () => {
            //console.log('document.body', document.body, 'window.frames', window.frames);
            //console.log('window.sms77', window.sms77);
            // console.log('document', document);
            console.log('window', window,);

            const {sms77browser} = await browser.storage.local.get(['sms77browser']);
            const {collectedPhones} = JSON.parse(sms77browser);
            console.log('collectedPhones', collectedPhones);
            setPhones(collectedPhones);
            //console.log('window.parent', window.parent);
            //if (window.sms77 && window.sms77.collectedPhones) setPhones(window.sms77.collectedPhones);
            //const nrs = General.collectNumbers(document.body);
            //console.log('nrs', nrs, 'isArray', Array.isArray(nrs));
            //setPhones(nrs);
        })();
    }, []);

    const handleClickToggle = () => {
    };

    const handleClickDelete = () => {
    };

    return <div className='number-collector'>
        {/*<a href='#openModal'>Modal-Fenster öffnen</a>*/}

        <table>
            <thead>
            <tr>
                <th>Toggle</th>
                <th>Number</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {phones.map(phone => <>
                <tr>
                    <td>
                        <input type='checkbox' onClick={() => handleClickToggle(phone)}/>
                    </td>
                    <th></th>
                    <td>
                        <button onClick={() => handleClickDelete(phone)}>❌</button>
                    </td>
                </tr>
            </>)}
            </tbody>
        </table>

        {/*        <div id='openModal' className='modalDialog'>
            <div>
                <a href='#close' title='Schließen' className='close'>X</a>
                <h2>Modal-Fenster</h2>
                <p>Dies ist ein modales Fenster, das mit HTML5 und CSS3 erstellt
                    wurde.</p>
            </div>
        </div>*/}
    </div>;
};
