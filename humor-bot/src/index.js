import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';

const theme =  {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#2c9c91',
    headerFontColor: '#fff',
    headerFontSize: '30px',
    botBubbleColor: '#2c9c91',
    // botFontSize: '100px',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
}




ReactDOM.render(
	<ThemeProvider theme={theme}>
    	<App />
    </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
