import React from 'react'
import ReactDOM from 'react-dom/client'
import {Popup} from './Popup'
import {General} from '../../util/General'
import Layout from '../../components/Layout'

const root = ReactDOM.createRoot(document.getElementById(General.WRAPPER_ID))

root.render(<Layout><Popup/></Layout>)
