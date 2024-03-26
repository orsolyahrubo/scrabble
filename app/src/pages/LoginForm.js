import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import validator from 'validator';
import Form from '../components/Form';
import InputRegular from '../components/InputRegular';

export default function LoginForm() {
    const envelope = <FontAwesomeIcon icon={faEnvelope} />;
    const lock = <FontAwesomeIcon icon={faLock} />;

    const initalValues = {
        email: '',
        password: '',
    };

    function isNotEmpty(value) {
        return value !== '';
    }

    function isThisEmail(value) {
        return validator.isEmail(value);
    }

    const validators = {
        email: [
            {
                fn: isNotEmpty,
                errorMessage: 'Cannot be empty.',
            },
            {
                fn: isThisEmail,
                errorMessage: 'Must be a valid email.',
            },
        ],
        password: [
            {
                fn: isNotEmpty,
                errorMessage: 'Cannot be empty.',
            },
        ],
    };

    async function handleSubmit(
        event,
        formData,
        setFormData,
        setErrorMessages,
        setFormAlertType,
        setFromAlertText,
        reportFormValidity,
        setWasValidated,
        navigate,
    ) {
        event.preventDefault();

        const userData = {
            email: formData.email,
            password: formData.password,
        };

        const formIsValid = reportFormValidity();

        if (formIsValid) {
            let response;

            try {
                response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: {
                        'Content-type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setFormData(initalValues);
                    setErrorMessages({});
                    setWasValidated(false);
                    navigate('/');
                } else {
                    setWasValidated(false);
                    setFormAlertType('danger');
                    setFromAlertText(data.error);
                }
            } catch (err) {
                setWasValidated(false);
                setFormAlertType('danger');
                setFromAlertText('Login failed. Please try again later.');
            }
        }
    }

    return (
        <main className="container">
            <Form title="Login" handleSubmit={handleSubmit} initalValues={initalValues} validators={validators}>
                {(handleOnChange, getValidationClassName, errorMessages, formData) => (
                    <>
                        <InputRegular
                            type="email"
                            name="email"
                            className="input-field"
                            handleOnChange={handleOnChange}
                            getValidationClassName={getValidationClassName}
                            errorMessages={errorMessages.email}
                            value={formData.email}
                            placeholder="Email*"
                            icon={envelope}
                        />
                        <InputRegular
                            type="password"
                            name="password"
                            className="input-field"
                            handleOnChange={handleOnChange}
                            getValidationClassName={getValidationClassName}
                            errorMessages={errorMessages.password}
                            value={formData.password}
                            placeholder="Password*"
                            icon={lock}
                        />
                    </>
                )}
            </Form>
        </main>
    );
}