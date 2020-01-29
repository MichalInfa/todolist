import React from 'react';
import './App.css';
import NewProjectView from './Views/NewProjectView/NewProjectForm';
import ProjectDetailView from './Views/ProjectDetailView/ProjectDetailView';
import UserFetch from './Components/UserFetch/UserFetch';
import ToDosView from './Views/ToDosView/ToDosView';
import ProjectView from './Views/AddProjectView/ProjectView';
import TaskView from './Views/TaskView/TaskView';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

function App() {

  
  //const [page, setPage] = useQueryParam('page', NumberParam);
  //const query = new URLSearchParams(window.location.search);
  //console.log(window.location.search)
  return (
    <BrowserRouter>
      <div className = "App">
        <Switch>
          <Route path = "/" exact component = {ProjectView} /> 
          <Route path = "/projects/new" exact component = {NewProjectView} />
          <Route path = "/projects/:projectid" exact component = {ProjectDetailView} />
          <Route path = {"/projects/:projectid/to_do_lists/:listid/tasks"} exact component = {ToDosView} />
          <Route path = {"/projects/:projectid/to_do_lists/:listid/tasks/:taskid"} exact component = {TaskView} />
          <Route path = "/userfetch" exact component = {UserFetch} />
          <Route path = "/" render = {() => <div>404</div>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
