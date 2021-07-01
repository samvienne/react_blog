import React from 'react';
import Header from '../../Components/Header/Header';
import classes from './Layout.module.css';
import Footer from '../../Components/Footer/Footer';

function Layout(props) {
    return (
        <div className={classes.Layout}>
            <Header user={props.user}/>
            <div className={classes.content}>
                {props.children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;