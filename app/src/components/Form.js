import './Form.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Form({
    title, handleSubmit, initalValues, validators, children,
}) {
    const [formData, setFormData] = useState(initalValues);
    const [errorMessages, setErrorMessages] = useState({});
    const [wasValidated, setWasValidated] = useState(false);

    const [formAlertText, setFromAlertText] = useState('');
    const [formAlertType, setFormAlertType] = useState('');

    const navigate = useNavigate();

    function reportFieldValidity(inputName) {
        const inputValue = formData[inputName];
        const inputValidators = validators[inputName];
        const inputValidationResults = inputValidators.map((inputValidator) => {
            const { fn: validatorFn, errorMessage: validatorErrorMessage } = inputValidator;
            const isValid = validatorFn(inputValue);
            return isValid ? '' : validatorErrorMessage;
        })
            .filter((errorMessage) => errorMessage !== '');

        setErrorMessages((prev) => ({
            ...prev,
            [inputName]: inputValidationResults,
        }));

        return inputValidationResults.length === 0;
    }

    function reportFormValidity() {
        const inputFieldNames = Object.keys(validators);
        const inputValidations = inputFieldNames.map((inputFieldName) => reportFieldValidity(inputFieldName));

        const isValid = inputValidations.every((isFieldValid) => isFieldValid);
        setWasValidated(true);
        return isValid;
    }

    function getValidationClassName(ifNotValid, fieldName) {
        let className = '';
        const key = fieldName;
        const isValid = errorMessages[key] && errorMessages[key].length === 0;

        if (wasValidated) {
            if (isValid) {
                className = 'is-valid';
            } else {
                className = ifNotValid;
            }
        }
        return className;
    }

    function handleOnChange({ target: { name, value } }) {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleCheckboxChange({ target: { name, checked } }) {
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    }

    return (
        <div className="form-container">

            <form
                onSubmit={(event) => handleSubmit(
                    event,
                    formData,
                    setFormData,
                    setErrorMessages,
                    setFormAlertType,
                    setFromAlertText,
                    reportFormValidity,
                    setWasValidated,
                    navigate,
                )}
                noValidate
            >
                <h1>{title}</h1>

                {children(
                    handleOnChange,
                    getValidationClassName,
                    errorMessages,
                    formData,
                    handleCheckboxChange,
                )}

                {formAlertText && (
                    <div className={`alert alert-${formAlertType}`} role="alert">
                        {formAlertText}
                    </div>
                )}

                <div className="text-center">
                    <button id="submit-btn" type="submit" className="btn btn-primary">{title}</button>
                </div>

            </form>
        </div>
    );
}