//Librairies
import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import routes from './config/routes';
import fire from './config/firebase';


//Components
import Layout from './hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Components/Contact/Contact';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';
import Ajouter from './Containers/admin/Ajouter/Ajouter';
import Authentification from './Containers/Security/Authentification/Authentification';

function App() {

  const [user, setUser] = useState('');

useEffect(() => {
  authListener();
}, []);

const authListener = () => {
  fire.auth().onAuthStateChanged(user => {
    if(user) {
      setUser(user);
    } else {
      setUser('');
    }
    
  });
}

  return (
    <div className="App">
      <Layout user={user}>
        <Switch>
          <Route exact path={routes.HOME} component={Home}/>
          <Route path={routes.CONTACT} component={Contact}/>
          <Route exact path={routes.ARTICLES} component={Articles}/>
          <Route exact path={routes.ARTICLES+'/:id'} render={() => <Article user={user}/>}/>
          { user ? <Route exact path={routes.AJOUTER} component={Ajouter}/> : null }
          { !user ? <Route exact path={routes.AUTHENTIFICATION} component={Authentification}/> : null }
          <Route render={() => <h1>404</h1>}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
