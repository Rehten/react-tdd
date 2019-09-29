import React, {useState, useCallback} from 'react';

export const AppointmentForm = ({
                                    selectableServices,
                                    service,
                                    onSubmit,
                                    salonOpensAt,
                                    salonClosesAt,
                                    today,
                                    availableTimeSlots
                                }) => {
    const [appointment, setAppointment] = useState({service});
    const handleSelect = ({target}) => setAppointment(() => {
        return ({service: target.value});
    });
    const handleStartsAtChange = useCallback(({target: {value}}) => setAppointment(appointment => {
        return ({...appointment, startsAt: parseInt(value)});
    }));

    return (<form id={'appointment'} onSubmit={() => onSubmit(appointment)}>
        <label htmlFor="service">Customer:</label>
        <select value={appointment.service} id={'service'} name={'service'} onChange={handleSelect}>
            <option onClick={handleSelect}/>
            {selectableServices.map(s => (<option key={s} value={s} onClick={handleSelect}>{s}</option>))}
        </select>
        <TimeSlotTable
            salonOpensAt={salonOpensAt}
            salonClosesAt={salonClosesAt}
            today={today}
            availableTimeSlots={availableTimeSlots}
            checkedTimeSlot={appointment.startsAt}
            handleChange={handleStartsAtChange}
        />
    </form>)
};

AppointmentForm.defaultProps = {
    today: new Date(),
    salonOpensAt: 9,
    salonClosesAt: 19,
    selectableServices: [
        'Cat',
        'Dog'
    ],
    availableTimeSlots: [
        {startsAt: new Date().setHours(9, 0, 0, 0)},
        {startsAt: new Date().setHours(9, 30, 0, 0)},
        {startsAt: new Date().setHours(10, 30, 0, 0)},
        {startsAt: new Date().setHours(11, 30, 0, 0)},
        {startsAt: new Date().setHours(13, 30, 0, 0)},
        {startsAt: new Date().setHours(14, 30, 0, 0)},
        {startsAt: new Date().setHours(15, 30, 0, 0)},
    ]
};

const TimeSlotTable = ({salonOpensAt, salonClosesAt, today, availableTimeSlots, checkedTimeSlot, handleChange}) => {
    const timeSlots = dayliTimeSlots(salonOpensAt, salonClosesAt);
    const dates = weeklyDateValues(today);

    return (<table id='timeslots'>
        <thead>
        <tr>
            <th/>
            {dates.map(d => <th key={d}>{toShortDate(d)}</th>)}
        </tr>
        </thead>
        <tbody>
        {timeSlots.map(timeSlot => {
            return (<tr key={timeSlot}>
                <th>{toTimeValue(timeSlot)}</th>
                {dates.map(date => (<td key={date}>
                    {
                        <RadioButtonIfAvailable
                            availableTimeSlots={availableTimeSlots}
                            date={date}
                            timeSlot={timeSlot}
                            checkedTimeSlot={checkedTimeSlot}
                            handleChange={handleChange}
                        />
                    }
                </td>))}
            </tr>)
        })}
        </tbody>
    </table>);
};

const RadioButtonIfAvailable = ({availableTimeSlots, date, timeSlot, checkedTimeSlot, handleChange}) => {
    const isButtonExists = (availableTimeSlots
        .some(availableTimeSlot => availableTimeSlot.startsAt === mergeDateAndTime(date, timeSlot)));
    const startsAt = mergeDateAndTime(date, timeSlot);
    const isChecked = (startsAt === checkedTimeSlot);

    if (isButtonExists) {
        return (<input
            name={'startsAt'}
            type={'radio'}
            value={startsAt}
            checked={isChecked}
            onChange={handleChange}
        />);
    } else {
        return null;
    }

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

const mergeDateAndTime = (date, timeSlot) => {
    const time = new Date(timeSlot);

    return new Date(date).setHours(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds(),
    );
};
