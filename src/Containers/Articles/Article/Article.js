
import React, { useEffect, useState } from 'react';
import axios from '../../../config/axio-firebase';
import routes from '../../../config/routes';
import classes from '../Article/Article.module.css';
import { Link, withRouter } from 'react-router-dom';

function Article(props) {
    
    const [article, setArticle] = useState({});

    let slug = props.match.params.id;

    useEffect(() => {
        axios.get('/articles.json?orderBy="slug"&equalTo="'+slug+'"').then(
            response => {

                if(Object.keys(response.data).length === 0) {
                    props.history.push(routes.HOME);
                }

                for (let key in response.data) {
                    setArticle({
                        ...response.data[key],
                        id: key
                    });
                }
            }
        ).catch(error =>{
            console.log(error);
        });
    }, []);

    let date = new Date(article.date).toLocaleDateString('fr-FR');

    const deleteClickHandler = () => {

        props.user.getIdToken()
            .then(token => {
                axios.delete('/articles/'+article.id+'.json?auth='+token).then(
                    response => {
                        console.log(response);
                        props.history.push(routes.HOME);
                    }
                ).catch(error => {
                    console.log(error);
                });
            })
            .catch(error => {
                console.log(error);
            });        
    }


    return(
        <div className="container">
            <h1>{article.titre}</h1>
            <div className={classes.lead}>
                <p>{article.accroche}</p>
                <p className={classes.content}>{article.contenu}</p>
                <strong>{article.auteur} </strong>
                <span>Publié le {date}</span>
                {article.brouillon == "true" ? <span> brouillon</span> : null}

                { props.user ? 
                    <>
                        <Link to={{ pathname: routes.AJOUTER, state: {article: article}}}>
                            <button className={classes.button}>Modifier</button>
                        </Link>
                        <button className={classes.button} onClick={deleteClickHandler}>Supprimer</button>
                    </>
                : null }
            </div>
        </div>
    );
}

export default withRouter (Article);