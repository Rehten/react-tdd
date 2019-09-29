import React, {useState} from 'react';

export const CustomerForm = ({firstName, lastName, phoneNumber, onSubmit}) => {
    const [customer, setCustomer] = useState({firstName, lastName, phoneNumber});
    const handleChangeCustomer = ({target}) => setCustomer(customer => ({...customer, [target.name]: target.value}));

    return (<form id={'customer'} onSubmit={() => onSubmit(customer)}>
                <label htmlFor="firstName">First name</label>
                <input
                    type="text"
                    name={'firstName'}
                    id={'firstName'}
                    value={firstName}
                    onChange={handleChangeCustomer}
                />
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
                <input type="submit" value={'Add'} />
            </form>);
};