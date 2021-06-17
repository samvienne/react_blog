import React, { useState } from 'react';

import Input from '../../../Components/UI/Input/Input';
import classes from './Ajouter.module.css';
import axios from '../../../config/axio-firebase';
import routes from '../../../config/routes';

function Ajouter(props) {

    //States

    const [valid, setValid] = useState(false);

    const [inputs, setInputs ] = useState({
        titre: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "Titre de l'article"
            },
            value: '',
            label: 'Titre',
            valid: false,
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
            value : '',
            label: "Accroche de l'article",
            valid: false,
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
            value : '',
            label: "Contenu de l'article",
            valid: false,
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
            value: '',
            label: "Auteur de l'article",
            valid: false,
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
            value: true,
            label: 'Etat',
            valid: true,
            validation: {}
        }
    });

    //functions
    const formHandler = (event) => {
        event.preventDefault();

        const article = {
            titre: inputs.titre.value,
            contenu: inputs.contenu.value,
            auteur: inputs.auteur.value,
            brouillon: inputs.brouillon.value,
            accroche: inputs.accroche.value,
            date: Date.now()
        }

        axios.post('/articles.json', article).then(
            response => {
                console.log(response);
                props.history.replace(routes.ARTICLES);
            }
        ).catch(error => {
            console.log(error);
        });
    }

    const checkvalidity = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
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
            <input className={classes.submit} type="submit" value="Envoyer" disabled={!valid}/>
        </form>
    );

    return(
        <div className="container">
            <h1>Ajouter</h1>
            {form}
        </div>
    );
}

export default Ajouter;