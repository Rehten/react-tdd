import React, {useState} from 'react';

const appointmentTimeOfDay = startsAt => {
    const [h, m] = new Date(startsAt).toTimeString().split(':');

    return `${h}:${m}`;
}

export const Appointment = (props) => {
    const {firstName} = props.customer;
    return (<div>{firstName}</div>);
};

export const AppointmentsDayView = props => {
    const [selectedAppointment, setSelectedAppointment] = useState(0);

    return (<div id={'appointmentsDayView'}>
        <ol>
            {props.appointments
                .map((appointment, i) => {
                    return (<li key={appointment.startsAt} >
                                <button type="button" onClick={() => setSelectedAppointment(i)}>
                                    {appointmentTimeOfDay(appointment.startsAt)}
                                    </button>
                            </li>);
                })}
        </ol>
        {
            props.appointments.length
            ?
            (<Appointment {...props.appointments[selectedAppointment]} />)
            :
            <p>There are no appointments scheduled for today</p>
        }
    </div>);
};
