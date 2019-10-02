import React from 'react';
import 'whatwg-fetch';
import {createContainer} from './domManipulators';
import {fetchResponseOk} from './spyHelpers';
import * as AppointmentFormExports from "../src/AppointmentForm";
import {AppointmentFormLoader} from "../src/AppointmentFormLoader";
import * as AppointmentsDayViewLoaderExports from "../src/AppointmentsDayViewLoader";
import * as AppointmentsDayViewExports from "../src/AppointmentsDayView";

describe('AppointmentsDayViewLoader', () => {
    let renderAndWait, render, container;
    const today = new Date();
    const appointments = [
        {
            startsAt: today.setHours(9, 0, 0, 0),
            customer: {
                firstName: 'Alex',
                lastName: 'Alex'.split('').reverse().join(''),
                phoneNumber: `+ 7 (${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}) ${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`,
                stylist: 'Jordan',
                service: 'Taxi',
                notes: '18-year old girl'
            }
        },
        {
            startsAt: today.setHours(10, 0, 0, 0),
            customer: {
                firstName: 'Alex',
                lastName: 'Alex'.split('').reverse().join(''),
                phoneNumber: `+ 7 (${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}) ${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}-${Math.round(Math.random() * 10)}${Math.round(Math.random() * 10)}`,
                stylist: 'Jordan',
                service: 'Taxi',
                notes: '18-year old girl'
            }
        }
    ];
    const {AppointmentsDayViewLoader} = AppointmentsDayViewLoaderExports;

    beforeEach(() => {
        ({renderAndWait, render, container} = createContainer());

        jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk(appointments));
        jest.spyOn(AppointmentsDayViewLoaderExports, 'AppointmentsDayViewLoader').mockReturnValue(null);
        jest.spyOn(AppointmentsDayViewExports, 'AppointmentsDayView').mockReturnValue(null);
    });

    afterEach(() => {
        window.fetch.mockRestore();
        AppointmentsDayViewLoaderExports.AppointmentsDayViewLoader.mockRestore();
    });

    it('fetches appointments happening today when component is mounted', async () => {
        const from = today.setHours(0, 0, 0, 0);
        const to = today.setHours(23, 59, 59, 999);

        await renderAndWait(<AppointmentsDayViewLoader today={today}/>);

        expect(window.fetch).toHaveBeenCalledWith(
            `/appointments/${from}-${to}`,
            expect.objectContaining({
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        );
    });

    it('initially passes no data to AppointmentsDayView', async () => {
        await renderAndWait(<AppointmentsDayViewLoaderExports.AppointmentsDayViewLoader/>);

        expect(AppointmentsDayViewExports.AppointmentsDayView).toHaveBeenCalledWith(
            {
                appointments: []
            },
            expect.anything()
        );
    });

    it('displays time slots that are fetched on mount', async () => {
        await renderAndWait(<AppointmentsDayViewLoader/>);

        expect(AppointmentsDayViewExports.AppointmentsDayView).toHaveBeenLastCalledWith(
            {
                appointments
            },
            expect.anything()
        )
    });

    it('re-requests appointments when today prop changes', async () => {
        const tomorrow = new Date(today);

        tomorrow.setHours(24);

        {
            const from = tomorrow.setHours(0, 0, 0, 0);
            const to = tomorrow.setHours(23, 59, 59, 999);

            await renderAndWait(<AppointmentsDayViewLoader today={today} />);

            await renderAndWait(<AppointmentsDayViewLoader today={tomorrow} />);

            expect(window.fetch).toHaveBeenLastCalledWith(`/appointments/${from}-${to}`, expect.anything());
        }
    });
});
