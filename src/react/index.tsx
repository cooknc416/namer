import React from 'react';
import ReactDom from 'react-dom';
import { App } from './components/App';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

ReactDom.render(<App />, mainElement);
