import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/View1/Header';  
import ProjectCard from './Components/View1/ProjectCard';
import AddProjectCard from './Components/View1/AddProjectCard';
import Detail from './Components/View2/Detail';
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
