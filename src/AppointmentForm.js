import React, {useState} from 'react';

export const AppointmentForm = ({selectableServices, service, onSubmit}) => {
    const [form, setForm] = useState({service});
    const handleSelect = ({target}) => setForm(form => ({service: target.value}));

    return (<form id={'appointment'} onSubmit={() => onSubmit(form)}>
        <label htmlFor="service">Customer:</label>
        <select value={form.service} id={'service'} name={'service'} readOnly>
            <option onClick={handleSelect} />
            {selectableServices.map(s => (<option key={s} value={s} onClick={handleSelect}>{s}</option>))}
        </select>
    </form>)
};

AppointmentForm.defaultProps = {
    selectableServices: [
        'Cat',
        'Dog'
    ]
};
