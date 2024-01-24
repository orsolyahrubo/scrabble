export default function InputCheckBox({
    label,
    name,
    checked,
    handleOnChange,
    getValidationClassName,
    errorMessages = [],
    href,
    hrefText,
}) {
    return (
        <div className="mb-3">
            <input
                checked={checked}
                name={name}
                type="checkbox"
                onChange={handleOnChange}
                id={name}
                value={name}
                className={`form-check-input ${getValidationClassName('is-invalid', name)}`}
            />
            <label htmlFor={name} className="form-check-label ms-1">
                {` ${label}`}
                <a href={href} target="_blank" rel="noopener noreferrer">
                    {hrefText}
                </a>
                {' *'}
            </label>
            <div className="invalid-feedback">
                {errorMessages.length === 1
                    ? errorMessages[0]
                    : (
                        <ul>
                            {errorMessages.map((errorMessage) => <li key={errorMessage}>{errorMessage}</li>)}
                        </ul>
                    )}
            </div>
        </div>
    );
}