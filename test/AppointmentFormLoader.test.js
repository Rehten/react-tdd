import React from 'react';
import 'whatwg-fetch';
import {createContainer} from "./domManipulators";
import ReactTestUtils, {act} from 'react-dom/test-utils';
import {fetchResponseOk} from "./spyHelpers";
import {AppointmentFormLoader} from "../src/AppointmentFormLoader";

describe('AppointmentFormLoader', () => {
    let render, container;
    const today = new Date();
    const availableTimeSlots = [
        {startsAt: today.setHours(9, 0, 0, 0)}
    ];

    beforeEach(() => {
        ({render, container} = createContainer());

        jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk(availableTimeSlots));
    });

    it('fetches data when component is mounted', async () => {
        render(<AppointmentFormLoader />);

        expect(window.fetch)
            .toHaveBeenCalledWith(
                '/availableTimeSlots',
                expect.objectContaining(
                    {
                        method: 'GET',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
            );
    });
});
