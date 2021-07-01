import React, {useState} from 'react';
import {checkvalidity} from '../../../shared/utility';
import Input from '../../../Components/UI/Input/Input';
import classes from './Authentification.module.css';
import routes from '../../../config/routes';
import fire from '../../../config/firebase';

function Authentification(props) {


    const [emailError, setEmailError] = useState(false);
    const [userError, setUserError] = useState(false);
    const [inputs, setInputs ] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: "Email"
            },
            value: '',
            label: 'Adresse email',
            valid: false,
            validation: {
                required: true,
                email: true
            },
            touched: false,
            errorMessage: "L'adresse email n'est pas valide"
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: "Mot de passe"
            },
            value: '',
            label: 'Mot de passe',
            valid: false,
            validation: {
                required: true,
                minLength: 6
            },
            touched: false,
            errorMessage: "Le mot de passe doit faire au moins 6 caractères"
        }
    });

    const [valid, setValid] = useState(false);

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

    const registerUser = () => {

        const user = {
            email: inputs.email.value,
            password: inputs.password.value
        };

        fire
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(reponse => {
                props.history.push(routes.HOME);
            })
            .catch(error => {
                // Adresse mail existante?
                switch(error.code) {
                    case 'auth/email-already-in-use':
                        setEmailError(true);
                        break;
                }
            });
    }

    const connexionUser = () => {
        const user = {
            email: inputs.email.value,
            password: inputs.password.value
        };

        fire
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(response => {
                props.history.push(routes.HOME);
            })
            .catch(error => {
                switch(error.code) {
                    case 'auth/user-not-found':
                    case 'auth/invalide-email':
                    case 'aut/user-disabled':
                    setUserError(true);
                    break;
                }
            });
    }

    const formHandler = event => {
        event.preventDefault();
    }

    const formElementsArray = [];
    for (let key in inputs) {
        formElementsArray.push({
            id: key,
            config: inputs[key]
        });
    }

    let form = (
        <form onSubmit={(e) => formHandler(e)}>
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
            <div className={classes.buttons}>
                <button onClick={registerUser} disabled={!valid} className={classes.button}>Inscription</button>
                <button onClick={connexionUser} disabled={!valid} className={classes.button}>Connexion</button>
            </div>
        </form>
    );


    return(
        <>
            <h1>Authentification</h1>
            <div className={classes.form}>
                {emailError ? <span className={classes.errorMessage}>Cet adresse email est déjà utilisée</span> : null }
                {userError ? <span className={classes.errorMessage}>Impossible de vous authentifier</span> : null }
                {form}
            </div>
        </>
    );
}

export default Authentification;