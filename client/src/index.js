import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';
import './i18n';
import App from 'app/App';
import './react-chartjs-2-defaults';
import './styles/index.css';

ReactDOM.render(<App />, document.getElementById('root'));
