import React from 'react';
import ReactDOM from 'react-dom';
import {Appointment, AppointmentsDayView} from "../src/Appointment";

describe('Appointment', () => {
    let container;
    let customer;

    const render = component => ReactDOM.render(component, container);

    beforeEach(() => {
        container = document.createElement('div');
    });

    it('renders the customer first name', function () {
        const customer = {firstName: 'Ashley'};
        const component = <Appointment customer={customer} />;

        document.body.appendChild(container);

        render(component);

        expect(container.textContent).toMatch('Ashley');
    });

    it('renders the customer first name', function () {
        const customer = {firstName: 'Jordan'};
        const component = <Appointment customer={customer} />;

        document.body.appendChild(container);

        render(component);

        expect(container.textContent).toMatch('Jordan');
    });
});

describe('AppointsmentsDayView', () => {
    let container;

    const render = component => ReactDOM.render(component, container);

    beforeEach(() => {
        container = document.createElement('div');
    });

    it('render div with the right id', () => {
        document.body.appendChild(container);

        render(<AppointmentsDayView appointments={[]} />);

        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
    });

    it('render multiple appointmentsin an ol element', () => {
        const today = new Date();
        const appointments = [{startsAt: today.setHours(12, 0)}, {startsAt: today.setHours(13, 0)}];

        document.body.appendChild(container);

        render(<AppointmentsDayView appointments={appointments}/>);

        expect(container.querySelector('ol')).not.toBeNull();
        expect(container.querySelector('ol').children).toHaveLength(2);
    })

});
