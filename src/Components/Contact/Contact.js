import React from 'react';
import classes from './Contact.module.css';
import {Route} from 'react-router-dom';

function Contact(props) {

    const emailClickedHandler = () => {
        props.history.push(props.match.url+'/email');
    }

    const callClickHandler = () => {
        props.history.push(props.match.url+'/tel');
    }

    return(
        <div className="container">
            <h1>Contact</h1>
            <p>Comment souhaitez-vous me contacter?</p>
            <button onClick={emailClickedHandler} className={classes.button}>Email</button>
            <button onClick={callClickHandler} className={classes.button}>Téléphone</button>

            <Route exact path={props.match.url+"/email"} render={() => <p>johndoe@test.com</p>}/>
            <Route exact path={props.match.url+"/tel"} render={() => <p>000 000 000</p>}/>
        </div>
    );
}

export default Contact;