import React from 'react';
import classes from './Displayarticle.module.css';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';

function DisplayArticle(props) {
    return(
        <Link className={classes.ArticleLink} to={routes.ARTICLES+'/'+props.article.slug}>
            <div className={classes.DisplayArticle}>
                <h2>{props.article.titre}</h2>
                <p>{props.article.accroche}</p>
                <small>{props.article.auteur}</small>
            </div>
        </Link>
    );
}

export default DisplayArticle;