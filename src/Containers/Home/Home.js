import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axio-firebase.js';
import routes from '../../config/routes.js';
import classes from '../Home/Home.module.css';

import DisplayArticles from '../../Components/Displayarticles/Displayarticles';

function Home() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('articles.json').then(
            response => {
                
                let articlesArray = [];

                for (let key in response.data) {
                    articlesArray.push({
                        ...response.data[key],
                        id: key
                    });
                }
                // Chronologie
                articlesArray.reverse();

                //filtre les articles publiés seulement
                articlesArray = articlesArray.filter(article => article.brouillon == "false");

                //Limiter à 3
                articlesArray = articlesArray.slice(0, 3);


                setArticles(articlesArray);
            }
        ).catch(error => {
            console.log(error);
        });
    }, []);

    return(
        <>
            <h1>Accueil</h1>
            <DisplayArticles articles={articles} />
            <Link to={routes.ARTICLES} className={classes.link}>Voir tous les articles
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                </svg>
            </Link>
        </>
    );
}

export default Home;