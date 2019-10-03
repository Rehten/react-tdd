import React from 'react';
import {AppointmentsDayViewLoader} from "./AppointmentsDayViewLoader";

export const App = () => (
    <React.Fragment>
        <div className='button-bar'>
            <button type="button">Add customer and appointment</button>
        </div>
        <AppointmentsDayViewLoader />
    </React.Fragment>
);