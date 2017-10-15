import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import Game from './Game';


ReactDOM.render(
  <div>
    <Game />
  </div>,
  document.getElementById('root'));
registerServiceWorker();
