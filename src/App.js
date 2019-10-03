import React, {useState, useCallback} from 'react';
import {AppointmentsDayViewLoader} from "./AppointmentsDayViewLoader";
import {CustomerForm} from "./CustomerForm";

export const App = () => {
    const [view, setView] = useState('dayView');
    const transitionToAddCustomer = useCallback(
        () => setView('addCustomer'),
        []
    );

    console.log('-----------------------');
    console.log(view);
    console.log('-----------------------');

    return (<React.Fragment>
        <div className='button-bar'>
            <button
                type="button"
                id={'addCustomer'}
                onClick={transitionToAddCustomer}
            >Add customer and appointment</button>
        </div>
        {view === 'addCustomer' ? <CustomerForm /> : <React.Fragment />}
        <AppointmentsDayViewLoader/>
    </React.Fragment>);
};
