import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import browser from 'webextension-polyfill'

export const PhoneTable = ({
                               phones,
                               setPhones,
                               setToggled,
                               toggled,
                           }: {
    phones: string[]
    setPhones: (entries: string[]) => void
    setToggled: (entries: string[]) => void
    toggled: string[]
}) => {
    const handleClickDelete = (phone: string) => {
        if (!confirm(browser.i18n.getMessage('confirm_delete_number'))) return

        const _phones = [...phones]

        _phones.splice(_phones.findIndex(p => p === phone), 1)

        setPhones(_phones)
    }

    const handleClickToggle = (phone: string) => {
        const _toggled = [...toggled]

        if (_toggled.includes(phone))
            _toggled.splice(_toggled.findIndex(p => p === phone), 1)
        else _toggled.push(phone)

        setToggled(_toggled)
    }

    const handleClickToggleAll = () => {
        setToggled(toggled.length ? [] : [...phones])
    }

    return <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Checkbox
                            aria-label={browser.i18n.getMessage('toggle_all')}
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
                        <Checkbox
                            checked={(() => toggled.includes(phone))()}
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
    </TableContainer>
}
