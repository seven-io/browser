import React from 'react'
import ReactDOM from 'react-dom/client'
import {Options} from './Options'
import {General} from '../../util/General'
import Layout from '../../components/Layout'

const root = ReactDOM.createRoot(document.getElementById(General.WRAPPER_ID))

root.render(<Layout><Options/></Layout>)
