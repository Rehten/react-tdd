import React from 'react';

export const Appointment = (props) => {
    const {firstName} = props.customer;
    return (<div>{firstName}</div>);
};

export const AppointmentsDayView = props => (<div id={'appointmentsDayView'}>
    <ol>
        {props.appointments.map(() => (<div />))}
    </ol>
</div>);
