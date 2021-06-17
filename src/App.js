//Librairies
import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import routes from './config/routes';


//Components
import Layout from './hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Components/Contact/Contact';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';
import Ajouter from './Containers/admin/Ajouter/Ajouter';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path={routes.HOME} component={Home}/>
          <Route path={routes.CONTACT} component={Contact}/>
          <Route exact path={routes.ARTICLES} component={Articles}/>
          <Route exact path={routes.ARTICLES+'/:id'} component={Article}/>
          <Route exact path={routes.AJOUTER} component={Ajouter}/>
          <Route render={() => <h1>404</h1>}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
