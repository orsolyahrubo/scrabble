import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleUser,
    faEnvelope,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import validator from 'validator';
import Form from '../components/Form';
import InputRegular from '../components/InputRegular';
import InputCheckBox from '../components/InputCheckbox';

export default function RegisterForm() {
    const user = <FontAwesomeIcon icon={faCircleUser} />;
    const envelope = <FontAwesomeIcon icon={faEnvelope} />;
    const lock = <FontAwesomeIcon icon={faLock} />;

    const initalValues = {
        name: '',
        email: '',
        password: '',
        auth: false,
    };

    function isNotEmpty(value) {
        return value !== '';
    }

    function isThisEmail(value) {
        return validator.isEmail(value);
    }

    function atLeastEightChars(value) {
        return value.length >= 8;
    }

    function isItChecked(value) {
        return value === true;
    }

    const validators = {
        name: [
            {
                fn: isNotEmpty,
                errorMessage: 'Cannot be empty.',
            },
        ],
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
            {
                fn: atLeastEightChars,
                errorMessage: 'Must be at least 8 characters long.',
            },
        ],
        auth: [
            {
                fn: isItChecked,
                errorMessage: 'Must be checked.',
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
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };

        const formIsValid = reportFormValidity();

        if (formIsValid) {
            let response;

            try {
                response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/register`, {
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

                    navigate('/login');
                } else {
                    setWasValidated(false);
                    setFormAlertType('danger');
                    setFromAlertText(data.error);
                }
            } catch (err) {
                setWasValidated(false);
                setFormAlertType('danger');
                setFromAlertText('Registration failed. Please try again later.');
            }
        }
    }

    return (
        <main className="container">
            <Form
                title="Registration"
                handleSubmit={handleSubmit}
                initalValues={initalValues}
                validators={validators}
            >

                {(
                    handleOnChange,
                    getValidationClassName,
                    errorMessages,
                    formData,
                    handleCheckboxChange,
                ) => (
                    <>
                        <InputRegular
                            type="text"
                            name="name"
                            className="input-field"
                            handleOnChange={handleOnChange}
                            getValidationClassName={getValidationClassName}
                            errorMessages={errorMessages.name}
                            value={formData.name}
                            placeholder="Name*"
                            icon={user}
                        />

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

                        <div id="authInput">
                            <InputCheckBox
                                label="I accept the "
                                name="auth"
                                checked={formData.auth}
                                handleOnChange={handleCheckboxChange}
                                getValidationClassName={getValidationClassName}
                                errorMessages={errorMessages.auth}
                                id="authCheckbox"
                                href="/terms"
                                hrefText="Terms and Conditions"
                            />
                        </div>
                    </>
                )}
            </Form>
        </main>
    );
}