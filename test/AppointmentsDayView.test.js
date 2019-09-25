import React from 'react';
import ReactDOM from 'react-dom';
import {AppointmentsDayView, Appointment} from "../src/AppointmentsDayView";
import ReactTestUtils from 'react-dom/test-utils';

describe('AppointmentsDayView', () => {
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

    it('renders the customer last name', function () {
        const customer = {firstName: 'Ashley', lastName: 'Green'};
        const component = <Appointment customer={customer}/>;

        render(component);

        expect(container.textContent).toMatch('Green');
    });

    it('render a table', () => {
        const customer = {firstName: 'Ashley', lastName: 'Green'};
        const component = <Appointment customer={customer}/>;

        render(component);

        expect(container.querySelectorAll('table')[0].tagName.toLowerCase()).toEqual('table');
    });

    it('table has a customer data', () => {
        const customer = {
            firstName: 'Ashley',
            lastName: 'Green',
            phoneNumber: '+7 (999) 99-99-999',
            stylist: 'Jordan',
            service: 'Taxi',
            notes: '18-year old girl'
        };
        const component = <Appointment customer={customer}/>;

        render(component);

        expect(container.querySelectorAll('table > tbody > tr > td')[0].textContent).toEqual('Ashley');
        expect(container.querySelectorAll('table > tbody > tr > td')[1].textContent).toEqual('Green');
        expect(container.querySelectorAll('table > tbody > tr > td')[2].textContent).toEqual('+7 (999) 99-99-999');
        expect(container.querySelectorAll('table > tbody > tr > td')[3].textContent).toEqual('Jordan');
        expect(container.querySelectorAll('table > tbody > tr > td')[4].textContent).toEqual('Taxi');
        expect(container.querySelectorAll('table > tbody > tr > td')[5].textContent).toEqual('18-year old girl');
    })
});

describe('AppointsmentsDayView', () => {
    let container;
    const today = new Date();
    const appointments = [
        {
            startsAt: today.setHours(12, 0),
            customer: {
                firstName: 'Ashley',
                lastName: 'Green'
            }
        },
        {
            startsAt: today.setHours(13, 0),
            customer: {
                firstName: 'Jordan',
                lastName: 'Green'
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
