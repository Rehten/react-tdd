import React, {useState} from 'react';

export const AppointmentForm = ({selectableServices, service, onSubmit, salonOpensAt, salonClosesAt, today}) => {
    const [form, setForm] = useState({service});
    const handleSelect = ({target}) => setForm(form => ({service: target.value}));

    return (<form id={'appointment'} onSubmit={() => onSubmit(form)}>
        <label htmlFor="service">Customer:</label>
        <select value={form.service} id={'service'} name={'service'} readOnly>
            <option onClick={handleSelect} />
            {selectableServices.map(s => (<option key={s} value={s} onClick={handleSelect}>{s}</option>))}
        </select>
        <TimeSlotTable salonOpensAt={salonOpensAt} salonClosesAt={salonClosesAt} today={today} />
    </form>)
};

AppointmentForm.defaultProps = {
    today: new Date(),
    salonOpensAt: 9,
    salonClosesAt: 19,
    selectableServices: [
        'Cat',
        'Dog'
    ]
};

const TimeSlotTable = ({salonOpensAt, salonClosesAt, today}) => {
    const timeSlots = dayliTimeSlots(salonOpensAt, salonClosesAt);
    const dates = weeklyDateValues(today);

    return (<table id='timeslots'>
        <thead>
        <tr>
            <th />
            {dates.map(d => <th key={d}>{toShortDate(d)}</th>)}
        </tr>
        </thead>
        <tbody>
        {timeSlots.map(timeSlot => (<tr key={timeSlot}><th>{toTimeValue(timeSlot)}</th></tr>))}
        </tbody>
    </table>);
};

const dayliTimeSlots = (salonOpensAt, salonClosesAt) => {
    const totalSlots = (salonClosesAt - salonOpensAt) * 2;
    const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
    const increment = 30 * 60 * 1000;

    return Array(totalSlots).fill([startTime]).reduce((acc, _, i) => acc.concat([startTime + (i * increment)]));
};

const toTimeValue = timeStamp => new Date(timeStamp).toTimeString().substring(0, 5);

const weeklyDateValues = startDate => {
    const midnight = new Date(startDate).setHours(0, 0, 0, 0);
    const increment = 24 * 60 * 60 * 1000;

    return Array(7).fill([midnight]).reduce((acc, _, i) => acc.concat([midnight + (i * increment)]));
};

const toShortDate = timestamp => {
    const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(' ');

    return `${day} ${dayOfMonth}`;
};
