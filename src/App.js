import React from 'react';
import './App.css';
import NewProjectView from './Views/NewProjectView/NewProjectForm';
import ProjectDetailView from './Views/ProjectDetailView/ProjectDetailView';
import UserFetch from './Components/UserFetch/UserFetch';
import ToDosView from './Views/ToDosView/ToDosView';
import ProjectView from './Views/AddProjectView/ProjectView';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <div className = "App">
        <Switch>
          <Route path = "/" exact component = {ProjectView} /> 
          <Route path = "/projects/new" exact component = {NewProjectView} />
          <Route path = "/projects/:projectid" exact component = {ProjectDetailView} />
          <Route path = {"/projects/:projectid/to_do_lists/:listid/tasks"} exact component = {ToDosView} />
          <Route path = "/userfetch" exact component = {UserFetch} />
          <Route path = "/" render = {() => <div>404</div>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
