import React from 'react';

const appointmentTimeOfDay = startsAt => {
    const [h, m] = new Date(startsAt).toTimeString().split(':');

    return `${h}:${m}`;
}

export const Appointment = (props) => {
    const {firstName} = props.customer;
    return (<div>{firstName}</div>);
};

export const AppointmentsDayView = props => {
    return (<div id={'appointmentsDayView'}>
        <ol>
            {props.appointments
                .map((appointment) => {
                    return (<li key={appointment.startsAt} >
                        <button type="button">{appointmentTimeOfDay(appointment.startsAt)}</button>
                    </li>)
                })}
        </ol>
        {props.appointments.length ? (<Appointment {...props.appointments[0]} />) : <p>There are no appointments scheduled for today</p>}
    </div>);
};
