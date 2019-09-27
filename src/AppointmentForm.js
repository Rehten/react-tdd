import React from 'react';

export const AppointmentForm = ({selectableServices, service}) => {
    return (<form id={'appointment'}>
        <select value={service} name={'service'} readOnly>
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
