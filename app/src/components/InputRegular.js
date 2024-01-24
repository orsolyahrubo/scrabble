export default function InputRegular(
    {
        name,
        handleOnChange,
        getValidationClassName,
        type,
        id,
        className,
        label,
        errorMessages = [],
        value = '',
        placeholder,
        icon,
        step,
        min,
    },
) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <div className="input-block">
                <i>{icon}</i>
                <input
                    type={type}
                    name={name}
                    onChange={handleOnChange}
                    id={id}
                    value={value}
                    className={`${className} form-control shadow-none ${getValidationClassName('is-invalid', name)}`}
                    placeholder={placeholder}
                    step={step}
                    min={min}
                />
                <div className="invalid-feedback" data-testid="errorblock">

                    {errorMessages.length === 1
                        ? errorMessages[0]
                        : (
                            <ul>
                                {errorMessages.map((errorMessage) => <li key={errorMessage}>{errorMessage}</li>)}
                            </ul>
                        )}
                </div>
            </div>
        </div>
    );
}