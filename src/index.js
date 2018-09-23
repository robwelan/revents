import React from 'react';
import ReactDOM from 'react-dom';
import './frameworks/semantic-ui-react-css';
import './index.css';
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
