import React from 'react';
import classes from './Displayarticles.module.css';
import DisplayArticle from '../Displayarticle/Displayarticle';

function DisplayArticles(props) {

    let articles = props.articles.map(article => (
        <DisplayArticle key={article.id} article={article}/>
    ));

    return (
        <section className={classes.DisplayArticles.concat(" container")}>
            {articles}
        </section>
    );

}

export default DisplayArticles;