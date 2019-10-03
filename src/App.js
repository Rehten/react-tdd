import React, {useState, useCallback} from 'react';
import {AppointmentsDayViewLoader} from "./AppointmentsDayViewLoader";
import {CustomerForm} from "./CustomerForm";
import {AppointmentFormLoader} from "./AppointmentFormLoader";

export const App = () => {
    const [view, setView] = useState('dayView');
    const transitionToAddCustomer = useCallback(
        () => setView('addCustomer'),
        []
    );
    const transitionToAddAppointment = useCallback(
        () => setView('addAppointment'),
        []
    );

    switch (view) {
        case 'addCustomer':
            return (<CustomerForm onSave={transitionToAddAppointment} />);
        case 'addAppointment':
            return (<AppointmentFormLoader />);
        default:
            return (<React.Fragment>
                <div className='button-bar'>
                    <button
                        type="button"
                        id={'addCustomer'}
                        onClick={transitionToAddCustomer}
                    >Add customer and appointment</button>
                </div>
                <AppointmentsDayViewLoader />
            </React.Fragment>);
    }
};
