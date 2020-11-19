import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';

const theme =  {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#136259',
    headerFontColor: '#fff',
    headerFontSize: '20px',
    botBubbleColor: '#ededed',
    botFontSize: '500px',
    botFontColor: '#4a4a4a',
    userBubbleColor: '#bbf2c8',
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
