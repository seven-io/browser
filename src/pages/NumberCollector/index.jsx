import React from 'react';
import {render} from 'react-dom';
import {NumberCollector} from './NumberCollector';
import {General} from '../../util/General';

render(<NumberCollector/>, document.getElementById(General.WRAPPER_ID));
