//Librairies
import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

//Components
import Layout from './hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Components/Contact/Contact';
import Articles from './Containers/Articles/Articles';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/articles" component={Articles}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
