import React, {useState, useEffect} from 'react';
import axios from '../../config/axio-firebase';

import DisplayArticles from '../../Components/Displayarticles/Displayarticles';


function Articles() {

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
                //chronologie
                articlesArray.reverse();

                //trier les articles publiés
                articlesArray = articlesArray.filter(article => article.brouillon == "false");

                setArticles(articlesArray);
            }
        ).catch(error => {
            console.log(error);
        });
    }, []);

    return(
        <>
            <h1>Articles</h1>
            <DisplayArticles articles={articles}/>
        </>
    );
}

export default Articles;