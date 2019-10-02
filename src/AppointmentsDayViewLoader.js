import React, {useEffect, useState} from 'react';
import {AppointmentsDayView} from "./AppointmentsDayView";

export const AppointmentsDayViewLoader = ({today, appointments}) => {
    const from = today.setHours(0, 0, 0, 0);
    const to = today.setHours(23, 59, 59, 999);

    useEffect(() => {
        const fetchAppointments = () => {
            window.fetch(`/appointments/${from}-${to}`, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };

        fetchAppointments();
    }, [from, to]);

    return <AppointmentsDayView appointments={[]} />;
};

AppointmentsDayViewLoader.defaultProps = {
    today: new Date()
};
