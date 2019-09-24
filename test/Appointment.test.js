import React from 'react';
import ReactDOM from 'react-dom';
import {Appointment, AppointmentsDayView} from "../src/Appointment";

describe('Appointment', () => {
    let container;
    let customer;

    const render = component => ReactDOM.render(component, container);

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it('renders the customer first name', function () {
        const customer = {firstName: 'Ashley'};
        const component = <Appointment customer={customer} />;

        render(component);

        expect(container.textContent).toMatch('Ashley');
    });

    it('renders the customer first name', function () {
        const customer = {firstName: 'Jordan'};
        const component = <Appointment customer={customer} />;

        render(component);

        expect(container.textContent).toMatch('Jordan');
    });
});

describe('AppointsmentsDayView', () => {
    let container;
    const today = new Date();
    const appointments = [{startsAt: today.setHours(12, 0)}, {startsAt: today.setHours(13, 0)}];

    const render = component => ReactDOM.render(component, container);

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it('render div with the right id', () => {
        render(<AppointmentsDayView appointments={[]} />);

        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
    });

    it('render multiple appointmentsin an ol element', () => {

        render(<AppointmentsDayView appointments={appointments}/>);

        expect(container.querySelector('ol')).not.toBeNull();
        expect(container.querySelector('ol').children).toHaveLength(2);
    });

    it('render each appointment in an li', () => {

        render(<AppointmentsDayView appointments={appointments}/>);

        expect(container.querySelectorAll('li')).toHaveLength(2);
        expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
        expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
    })

});
