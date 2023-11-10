import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

export default function Layout({children}) {
    return <React.StrictMode>
        <CssBaseline/>

        {children}
    </React.StrictMode>
}
