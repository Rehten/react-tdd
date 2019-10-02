import React from 'react';
import 'whatwg-fetch';
import {createContainer} from './domManipulators';
import {fetchResponseOk} from './spyHelpers';
import * as AppointmentFormExports from "../src/AppointmentForm";
import {AppointmentFormLoader} from "../src/AppointmentFormLoader";
import * as AppointmentsDayViewLoaderExports from "../src/AppointmentsDayViewLoader";

describe('AppointmentsDayViewLoader', () => {
    let renderAndWait, render, container;
    const today = new Date();
    const appointments = [
        {startsAt: today.setHours(9, 0, 0, 0)},
        {startsAt: today.setHours(10, 0, 0, 0)}
    ];
    const {AppointmentsDayViewLoader} = AppointmentsDayViewLoaderExports;

    beforeEach(() => {
        ({renderAndWait, render, container} = createContainer());

        jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk(appointments));
        jest.spyOn(AppointmentsDayViewLoaderExports, 'AppointmentsDayViewLoader').mockReturnValue(null);
    });

    afterEach(() => {
        window.fetch.mockRestore();
        AppointmentsDayViewLoaderExports.AppointmentsDayViewLoader.mockRestore();
    });

    it('fetches appointments happening today when component is mounted', async () => {
        const from = today.setHours(0, 0, 0, 0);
        const to = today.setHours(23, 59, 59, 999);

        await renderAndWait(<AppointmentsDayViewLoader today={today} />);

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
        await renderAndWait(<AppointmentsDayViewLoaderExports.AppointmentsDayViewLoader />);

        expect(AppointmentsDayViewLoaderExports.AppointmentsDayViewLoader).toHaveBeenCalledWith(
            {},
            expect.anything()
        );
    });
});
