import React from 'react';
import classes from './Layout.module.css';
import 'react-toastify/dist/ReactToastify.css';

// Component
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';


function Layout(props) {
    return (
        <div className={classes.Layout}>
            <Header user={props.user}/>
            <div className={classes.content}>
                {props.children}
            </div>
            <ToastContainer autoClose="8000" position="bottom-right"/>
            <Footer />
        </div>
    );
}

export default Layout;