import React, { useState } from 'react';

import Input from '../../../Components/UI/Input/Input';
import classes from './Ajouter.module.css';

function Ajouter() {

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
            touched: false
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
            touched: false
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
            touched: false
        },
        brouillon: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: true, displayValue: 'Brouillon'},
                    {value: false, displayValue: 'Publié'}
                ]
            },
            value: '',
            label: 'Etat',
            valid: true,
            validation: {}
        }
    });

    //functions
    const formHandler = (event) => {
        event.preventDefault();
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