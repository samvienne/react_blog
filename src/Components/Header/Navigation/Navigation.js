//Librairies
import React from 'react';
import classes from './Navigation.module.css';
import routes from '../../../config/routes';
import { withRouter } from 'react-router-dom';

//Composants
import NavigationItem from './NavigationItem/NavigationItem';
import fire from '../../../config/firebase';


function Navigation(props) {

    const onClickLogout = () => {
        fire.auth().signOut();
        props.history.push(routes.AUTHENTIFICATION);        
    }

    return (
        <ul className={classes.Navigation}>
            <NavigationItem exact to={routes.HOME}>Accueil</NavigationItem>
            <NavigationItem to={routes.ARTICLES}>Articles</NavigationItem>
            <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>
            { props.user ? <NavigationItem exact to={routes.AJOUTER}>Ajouter</NavigationItem> : null }
            { !props.user ? <NavigationItem exact to={routes.AUTHENTIFICATION}>Authentification</NavigationItem> : null }
            { props.user ? <button className={classes.logout} onClick={onClickLogout}>Déconnexion</button> : null }
        </ul>
    );
}

export default withRouter (Navigation);
