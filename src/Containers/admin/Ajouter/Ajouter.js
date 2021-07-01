import React, { useState } from 'react';

import Input from '../../../Components/UI/Input/Input';
import classes from './Ajouter.module.css';
import axios from '../../../config/axio-firebase';
import routes from '../../../config/routes';
import {checkvalidity} from '../../../shared/utility';
import fire from '../../../config/firebase';

function Ajouter(props) {

    //States

    const [valid, setValid] = useState(props.location.state && props.location.state.article ? true : false);

    const [inputs, setInputs ] = useState({
        titre: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "Titre de l'article"
            },
            value: props.location.state && props.location.state.article ? props.location.state.article.titre : '',
            label: 'Titre',
            valid: props.location.state && props.location.state.article ? true : false,
            validation: {
                required: true,
                minLength: 5,
                maxLength: 85
            },
            touched: false,
            errorMessage: "Le titre doit comporter entre 5 et 85 caractères"
        },
        accroche: {
            elementType: 'textarea',
            elementConfig: {},
            value : props.location.state && props.location.state.article ? props.location.state.article.accroche : '',
            label: "Accroche de l'article",
            valid: props.location.state && props.location.state.article ? true : false,
            validation: {
                required: true,
                minLength: 10,
                maxLength: 140
            },
            touched: false,
            errorMessage: "Ce champ ne peut pas être vide. Doit être compris entre 10 et 140 caractères"
        },
        contenu: {
            elementType: 'textarea',
            elementConfig: {},
            value : props.location.state && props.location.state.article ? props.location.state.article.contenu : '',
            label: "Contenu de l'article",
            valid: props.location.state && props.location.state.article ? true : false,
            validation: {
                required: true
            },
            touched: false,
            errorMessage: "Ce champ ne peut pas être vide"
        },
        auteur: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "Auteur de l'article"
            },
            value: props.location.state && props.location.state.article ? props.location.state.article.auteur : '',
            label: "Auteur de l'article",
            valid: props.location.state && props.location.state.article ? true : false,
            validation: {
                required: true
            },
            touched: false,
            errorMessage: "Ce champ ne peut pas être vide"
        },
        brouillon: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: true, displayValue: 'Brouillon'},
                    {value: false, displayValue: 'Publié'}
                ]
            },
            value: props.location.state && props.location.state.article ? props.location.state.article.brouillon : '',
            label: 'Etat',
            valid: props.location.state && props.location.state.article ? true : false,
            validation: {}
        }
    });

    //functions

    const generateSlug= str => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
      
        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
    
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
    
        return str;
    }

    const formHandler = (event) => {
        event.preventDefault();

        const article = {
            titre: inputs.titre.value,
            contenu: inputs.contenu.value,
            auteur: inputs.auteur.value,
            brouillon: inputs.brouillon.value,
            accroche: inputs.accroche.value,
            date: Date.now(),
            slug: generateSlug(inputs.titre.value)
        }

        fire.auth().currentUser.getIdToken()
            .then(token => {
                if (props.location.state && props.location.state.article) {
                    axios.put('/articles/'+props.location.state.article.id+'.json?auth=' + token, article).then(
                        response => {
                            props.history.replace(routes.ARTICLES+'/'+ article.slug);
                        }
                    ).catch(error => {
                        console.log(error);
                    });
                } else {
                    axios.post('/articles.json?auth=' + token, article).then(
                        response => {
                            props.history.replace(routes.ARTICLES);
                        }
                    ).catch(error => {
                        console.log(error);
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const intputChangedHnadler = (event, id) => {
        const nouveauxInputs = {...inputs};
        nouveauxInputs[id].value = event.target.value;
        nouveauxInputs[id].touched = true;

        //Vérification valeur
        nouveauxInputs[id].valid = checkvalidity(event.target.value, nouveauxInputs[id].validation);

        setInputs(nouveauxInputs);

        //Vérification formuaire
        let formisValid = true;
        for(let input in nouveauxInputs) {
            formisValid = nouveauxInputs[input].valid && formisValid;
        }
        setValid(formisValid);
    }


    // Variables
    const formElementsArray = [];
    for (let key in inputs) {
        formElementsArray.push({
            id: key,
            config: inputs[key]
        });
    }

    let form = (
        <form className={classes.Ajouter} onSubmit={(e) => formHandler(e)}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    id={formElement.id}
                    value={formElement.config.value}
                    label={formElement.config.label}
                    type={formElement.config.elementType}
                    config={formElement.config.elementConfig}
                    valid={formElement.config.valid}
                    changed={(e) => intputChangedHnadler(e, formElement.id)}
                    touched={formElement.config.touched}
                    errorMessage={formElement.config.errorMessage}
                />
            ))}
            <input className={classes.submit} type="submit" value={props.location.state && props.location.state.article ? 'Modifier un article' : 'Ajouter un article'} disabled={!valid}/>
        </form>
    );

    return(
        <div className="container">
            {props.location.state && props.location.state.article ?
                <h1>Modifier</h1>
                :
                <h1>Ajouter</h1>
            }
            {form}
        </div>
    );
}

export default Ajouter;