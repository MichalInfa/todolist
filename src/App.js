import React from 'react';
import './App.css';
import Header from './Components/AddProject/Header';  
import ProjectCard from './Components/AddProject/ProjectCard';
import AddProjectCard from './Components/AddProject/AddProjectCard';
import Detail from './Components/ProjectCard/Detail';
import TopHeader from './Components/EmptyProject/TopHeader';
import ProjectDetailView from './Components/EmptyProject/ProjectDetailView';
import UserFetch from './Components/UserFetch/UserFetch';
import styled, {css} from 'styled-components';

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Here we create a component that will rotate everything we pass in over two seconds
const Przycisk = styled.button`background: transparent;
border-radius: 3px;
border: 2px solid palevioletred;
color: palevioletred;
margin: 0 1em;
padding: 0.25em 1em;

${props => props.primary &&  css`
    background: palevioletred;
    color: white;
  `};
`

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
            <Link to = "/userfetch">
            <Przycisk>
              Hello world
            </Przycisk>
            </Link>
            
          </Route>
          <Route path = "/userfetch" exact component = {UserFetch} />
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
      </div>
    </BrowserRouter>
  );
}

export default App;
