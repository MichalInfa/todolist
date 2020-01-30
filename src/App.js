import React from 'react';
import './App.css';
import NewProjectView from './Views/NewProjectView/NewProjectCard';
import ProjectDetailView from './Views/ProjectDetailView/ProjectDetails';
import UserFetch from './Components/UserFetch/UserFetch';
import ToDosView from './Views/ToDosView/ToDosCard';
import ProjectView from './Views/ProjectView/Projects';
import TaskView from './Views/TaskView/TaskCard';

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
          <Route path = {["/projects","/"]}  exact component = {ProjectView} /> 
          <Route path = "/projects/new" exact component = {NewProjectView} />
          <Route path = {["/projects/:projectid","/projects/:projectid/to_do_lists"]} exact component = {ProjectDetailView} />
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
