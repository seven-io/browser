import {
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import browser from 'webextension-polyfill';
import {Delete} from '@material-ui/icons';
import React from 'react';

export const PhoneTable = ({
                               phones,
                               setPhones,
                               setToggled,
                               toggled,
                           }) => {
    const handleClickDelete = phone => {
        if (!confirm(browser.i18n.getMessage('confirm_delete_number'))) return;

        const _phones = [...phones];

        _phones.splice(_phones.findIndex(p => p === phone), 1);

        setPhones(_phones);
    };

    const handleClickToggle = phone => {
        const _toggled = [...toggled];

        if (_toggled.includes(phone))
            _toggled.splice(_toggled.findIndex(p => p === phone), 1);
        else _toggled.push(phone);

        setToggled(_toggled);
    };

    const handleClickToggleAll = () => {
        setToggled(toggled.length ? [] : [...phones]);
    };

    return <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Checkbox aria-label={browser.i18n.getMessage('toggle_all')}
                                  checked={(() => toggled.length === phones.length)()}
                                  onChange={handleClickToggleAll}
                        />

                        {browser.i18n.getMessage('toggle')}
                    </TableCell>
                    <TableCell>{browser.i18n.getMessage('number')}</TableCell>
                    <TableCell>{browser.i18n.getMessage('delete')}</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {phones.map(phone => <TableRow key={phone}>
                    <TableCell>
                        <Checkbox checked={(() => toggled.includes(phone))()}
                                  onChange={() => handleClickToggle(phone)}
                        />
                    </TableCell>
                    <TableCell>{phone}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => handleClickDelete(phone)}>
                            <Delete/>
                        </IconButton>
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>;
};
