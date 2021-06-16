import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return(
        <>
            <h1>Accueil</h1>
            <Link to="/articles/1">Article 1</Link>
            <Link to="" style={{marginLeft: '10px'}}>Ancre</Link>
        </>
    );
}

export default Home;