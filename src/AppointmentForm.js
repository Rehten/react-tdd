import React, {useState} from 'react';

export const AppointmentForm = ({selectableServices, service, onSubmit}) => {
    const form = {service};

    return (<form id={'appointment'} onSubmit={() => onSubmit(form)}>
        <label htmlFor="service">Customer:</label>
        <select value={service} id={'service'} name={'service'} readOnly>
            <option />
            {selectableServices.map(s => (<option key={s}>{s}</option>))}
        </select>
    </form>)
};

AppointmentForm.defaultProps = {
    selectableServices: [
        'Cat',
        'Dog'
    ]
};
