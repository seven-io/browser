import React from 'react';
import {render} from 'react-dom';
import {PhoneCollector} from './PhoneCollector';
import {General} from '../../util/General';

render(<PhoneCollector/>, document.getElementById(General.WRAPPER_ID));
