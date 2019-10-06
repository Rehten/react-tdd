import React, {useState} from 'react';

export const CustomerForm = ({firstName, lastName, phoneNumber, onSave}) => {
    const required = value => (!value || value.trim() === '') ? 'First name is required' : undefined;
    const [validationErrors, setValidationErrors] = useState({});
    const handleBlur = ({target}) => {
        const result = required(target.value);
        setValidationErrors({
            ...validationErrors,
            firstName: result
        });
    };
    const hasFirstNameError = () => validationErrors.firstName !== undefined;
    const renderFirstNameError = () => {

        if (hasFirstNameError()) {
            return (
                <span className={'error'}>{validationErrors.firstName}</span>
            );
        }
    };
    const [error, setError] = useState(false);
    const [customer, setCustomer] = useState({firstName, lastName, phoneNumber});
    const handleChangeCustomer = ({target}) => setCustomer(customer => ({...customer, [target.name]: target.value}));
    const handleSubmit = async e => {
        e.preventDefault();

        {
            const result = await window.fetch('/customers', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/json'}
            });

            if (result.ok) {
                const customerWithId = await result.json();

                onSave(customerWithId);
            } else {
                setError(true);
            }
        }
    };

    return (<form id={'customer'} onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name</label>
        <input
            type="text"
            name={'firstName'}
            id={'firstName'}
            value={firstName}
            onChange={handleChangeCustomer}
            onBlur={handleBlur}
        />
        {renderFirstNameError()}
        <label htmlFor="lastName">Last name</label>
        <input
            type="text"
            name={'lastName'}
            id={'lastName'}
            value={lastName}
            onChange={handleChangeCustomer}
        />
        <label htmlFor="phoneNumber">Phone number</label>
        <input
            type="text"
            name={'phoneNumber'}
            id={'phoneNumber'}
            value={phoneNumber}
            onChange={handleChangeCustomer}
        />
        <input type="submit" value={'Add'}/>
        {error ? <Error /> : null}
    </form>);
};

CustomerForm.defaultProps = {
    fetch: async () => {
    },
    onSave: () => {
    }
};

const Error = () => (<div className={'error'}> An error occured during save.</div>);
