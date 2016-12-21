import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import LoginPage from './components/Login-page/Login-page';
import IndexPage from './components/Index-page/Index-page';
import PrisonPage from './components/Prison-page/Prison-page';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import 'normalize.css';

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path='/' component={ App }>
      <IndexRoute component={ IndexPage } />
      <Route path='login' component={ LoginPage }/>
      <Route path='prisons' component={ IndexPage }/>
      <Route path='/prisons/:prisonId' component={ PrisonPage }/>
    </Route>
  </Router>,
  document.getElementById('root')
);
