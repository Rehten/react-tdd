import React from 'react';
import ReactDOM from 'react-dom';
import {Appointment, AppointmentsDayView} from "../src/Appointment";
import ReactTestUtils from 'react-dom/test-utils';

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
        const component = <Appointment customer={customer}/>;

        render(component);

        expect(container.textContent).toMatch('Ashley');
    });

    it('renders the customer first name', function () {
        const customer = {firstName: 'Jordan'};
        const component = <Appointment customer={customer}/>;

        render(component);

        expect(container.textContent).toMatch('Jordan');
    });
});

describe('AppointsmentsDayView', () => {
    let container;
    const today = new Date();
    const appointments = [
        {
            startsAt: today.setHours(12, 0),
            customer: {
                firstName: 'Ashley'
            }
        },
        {
            startsAt: today.setHours(13, 0),
            customer: {
                firstName: 'Jordan'
            }
        }
    ];

    const render = component => ReactDOM.render(component, container);

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    it('render div with the right id', () => {
        render(<AppointmentsDayView appointments={[]}/>);

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
    });

    it('initially shows a message saying there are no appointments today', () => {
        render(<AppointmentsDayView appointments={[]}/>);
        expect(container.textContent).toMatch('There are no appointments scheduled for today');
    });

    it('render first appointment by default', () => {
        render(<AppointmentsDayView appointments={appointments}/>);
        expect(container.textContent).toMatch('Ashley');
    });

    it('has a button element for each li', () => {
        render(<AppointmentsDayView appointments={appointments}/>);

        expect(container.querySelectorAll('li > button')).toHaveLength(2);
        expect(container.querySelectorAll('li > button')[0].type).toEqual('button');
    });

    it('renders another appointment whan selected', () => {
        render(<AppointmentsDayView appointments={appointments} />);

        {
            const button = container.querySelectorAll('button')[1];
            ReactTestUtils.Simulate.click(button);
            expect(container.textContent).toMatch('Jordan');
        }

    });

});
