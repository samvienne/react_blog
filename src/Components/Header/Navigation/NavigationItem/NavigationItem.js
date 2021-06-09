import React from 'react';
import {Link} from 'react-router-dom';
import classes from './NavigationItem.module.css';

function NavigationItem(props) {
    return(
        <li className={classes.NavigationItem}>
            <Link to={props.to}>{props.children}</Link>
        </li>
    );
}

export default NavigationItem;