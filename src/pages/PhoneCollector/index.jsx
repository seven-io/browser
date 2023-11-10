import React from 'react'
import ReactDOM from 'react-dom/client'
import {PhoneCollector} from './PhoneCollector'
import {General} from '../../util/General'
import Layout from '../../components/Layout'

const root = ReactDOM.createRoot(document.getElementById(General.WRAPPER_ID))

root.render(<Layout><PhoneCollector/></Layout>)
