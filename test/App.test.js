import React from 'react';
import {childrenOf, className, click, createShallowRenderer, id, type} from './shallowHelpers';
import {App} from '../src/App';
import {AppointmentsDayViewLoader} from "../src/AppointmentsDayViewLoader";
import {CustomerForm} from "../src/CustomerForm";
import {AppointmentFormLoader} from "../src/AppointmentFormLoader";

describe('App', () => {
    let render, elementMatching, child;
    const beginAddCustomerAndAppointment = () => {
        render(<App />);

        click(elementMatching(id('addCustomer')));
    };
    const saveCustomer = customer => elementMatching(type(CustomerForm)).props.onSave(customer);
    const saveAppointment = () => elementMatching(type(AppointmentFormLoader)).props.onSubmit();

    beforeEach(() => {
        ({render, elementMatching, child} = createShallowRenderer());
    });

    it('initially shows the AppointmentDayViewLoader', async () => {
        render(<App />);
        expect(elementMatching(type(AppointmentsDayViewLoader))).toBeDefined();
    });

    it('has a button bar as the first child', () => {
        render(<App />);

        expect(child(0).type).toEqual('div');
        expect(child(0).props.className).toEqual('button-bar');
    });

    it('has a button to initiate add customer and appointment action', () => {
        render(<App />);

        {
            const buttons = childrenOf(elementMatching(className('button-bar')));

            expect(buttons[0].type).toEqual('button');
            expect(buttons[0].props.id).toEqual('addCustomer');
            expect(buttons[0].props.children).toEqual('Add customer and appointment');
        }
    });

    it('displays the CustomerForm when button is clicked', async () => {
        beginAddCustomerAndAppointment();

        expect(elementMatching(type(CustomerForm))).toBeDefined();
    });

    it('hides the AppointmentDayViewLoader when button is clicked', async () => {
        beginAddCustomerAndAppointment();
        expect(elementMatching(type(AppointmentsDayViewLoader))).not.toBeDefined();
    });

    it('hides the button bar when CustomerForm is being displayed', async () => {
        beginAddCustomerAndAppointment();
        expect(child(0)).not.toBeDefined();
    });

    it('displays the AppointmentFormLoader after CustomerForm is submitted', async () => {
        beginAddCustomerAndAppointment();
        saveCustomer();

        expect(elementMatching(type(AppointmentFormLoader))).toBeDefined();
    });

    it('passes the customer to the AppointmentForm', async () => {
        const customer = {id: 123};

        beginAddCustomerAndAppointment();
        saveCustomer(customer);

        expect(elementMatching(type(AppointmentFormLoader)).props.customer).toBe(customer);
    });

    it('renders AppointmentDayViewLoader after AppointmentForm is submitted', async () => {
        beginAddCustomerAndAppointment();
        saveCustomer();
        saveAppointment();

        expect(elementMatching(type(AppointmentsDayViewLoader))).toBeDefined();
    });
});
