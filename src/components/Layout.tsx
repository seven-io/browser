import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import React, {type ReactNode} from 'react'

export default function Layout({children}: { children: ReactNode }) {
    return <React.StrictMode>
        <CssBaseline/>

        <Container component='main' sx={{minWidth: 200}}>
            {children}
        </Container>
    </React.StrictMode>
}
