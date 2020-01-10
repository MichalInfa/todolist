import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/AddProject/Header';  
import ProjectCard from './Components/AddProject/ProjectCard';
import AddProjectCard from './Components/AddProject/AddProjectCard';
import Detail from './Components/ProjectCard/Detail';
import TopHeader from './Components/EmptyProject/TopHeader';
import ProjectDetailView from './Components/EmptyProject/ProjectDetailView';

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className = "App">
        <Switch>
          <Route path = "/" exact> 
            <Header />
            <ProjectCard title = "Acme Inc. Landing Page Design" />
            <ProjectCard title = "Office Renovation" />
            <AddProjectCard />
          </Route>
          <Route path = "/add-project" exact component = {Detail} />
          <Route path = "/project/Acme_Inc._Landing_Page_Design" exact>
            <TopHeader title = "Acme_Inc._Landing_Page_Design" />
            <ProjectDetailView title = "Acme_Inc._Landing_Page_Design"/>
          </Route>
          <Route path = "/project/Office_Renovation" exact>
            <TopHeader title = "Office_Renovation" />
            <ProjectDetailView title = "Office_Renovation"/>
          </Route>
          <Route path = "/" render = {() => <div>404</div>} />
        </Switch>




        {/* ----first view----
        <Header />
        <ProjectCard title = "Acme Inc. Landing Page Design" />
        <ProjectCard title = "Office Renovation" />
        <AddProjectCard />
        */}

          {/* ----second view----
          <Detail />
          */}
        </div>
    </BrowserRouter>
  );
}

export default App;
