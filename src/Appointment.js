import React from 'react';

const appointmentTimeOfDay = startsAt => {
    const [h, m] = new Date(startsAt).toTimeString().split(':');

    return `${h}:${m}`;
}

export const Appointment = (props) => {
    const {firstName} = props.customer;
    return (<div>{firstName}</div>);
};

export const AppointmentsDayView = props => (<div id={'appointmentsDayView'}>
    <ol>
        {props.appointments.map((appointment) => (<li key={appointment.startsAt} >{appointmentTimeOfDay(appointment.startsAt)}</li>))}
    </ol>
</div>);
