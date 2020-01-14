import React from 'react';
import './App.css';
import NewProjectView from './Views/NewProjectView/NewProjectForm';
import ProjectDetailView from './Views/ProjectDetailView/ProjectDetailView';
import UserFetch from './Components/UserFetch/UserFetch';
import ToDosView from './Views/ToDosView/ToDos';
import ProjectView from './Views/AddProjectView/ProjectView';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className = "App">
        <Switch>
          <Route path = "/" exact component = {ProjectView} /> 
          <Route path = "/add-project" exact component = {NewProjectView} />
          <Route path = "/project" exact component = {ProjectDetailView} />
          <Route path = "/project/:id" exact component = {ToDosView} />
          <Route path = "/userfetch" exact component = {UserFetch} />
          <Route path = "/" render = {() => <div>404</div>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
