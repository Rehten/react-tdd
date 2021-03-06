import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {createContainer} from "./domManipulators";
import {CustomerForm} from "../src/CustomerForm";
import {AppointmentForm} from "../src/AppointmentForm";
import {Appointment} from "../src/AppointmentsDayView";
import {fetchResponseOk} from "./spyHelpers";
import 'whatwg-fetch';

describe('CustomerForm', () => {
    const customer = {id: 123};
    let render, container;
    const form = id => container.querySelector('form[id="' + id + '"]');
    const field = name => form('appointment').elements[name];
    const label = name => container.querySelector(`label[for="${name}"]`);
    const findOption = (dropdownNode, textContent) => {
        return Array.from(dropdownNode).find(option => option.textContent === textContent);
    };

    const startsAtField = index => container.querySelectorAll('input[name="startsAt"]')[index];

    beforeEach(() => {
        ({render, container} = createContainer());
        jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk(customer));
    });

    afterEach(() => {
        window.fetch.mockRestore();
    });

    it('renders a form', () => {
        render(<AppointmentForm/>);

        expect(form('appointment')).not.toBeNull();
    });

    describe('service field', () => {
        it('render a select box', () => {
            render(<AppointmentForm/>);

            expect(field('service')).not.toBeNull();
            expect(field('service').tagName).toEqual('SELECT');
        });

        it('initially has a blank value', () => {
            render(<AppointmentForm/>);

            const firstNode = field('service').childNodes[0];

            expect(firstNode.value).toEqual('');
            expect(firstNode.selected).toBeTruthy();
        });

        it('lists all salon services', () => {
            const selectableServices = [
                'Cut',
                'Blow-dry',
                'Cut & color',
                'Beard trim',
                'Cut & beard trim',
                'Extensions'
            ];

            render(<AppointmentForm selectableServices={selectableServices}/>);

            {
                const optionNodes = Array.from(field('service').childNodes);

                const renderedServices = optionNodes.map(node => node.textContent);

                expect(renderedServices).toEqual(expect.arrayContaining(selectableServices));
            }
        });

        it('preselects the existing value', () => {
            const services = ['Cut', 'Blow-dry'];

            render(<AppointmentForm selectableServices={services} service='Blow-dry'/>);

            expect(findOption(field('service'), 'Blow-dry').selected).toBeTruthy();
        });

        it('renders a label', () => {
            render(<AppointmentForm/>);

            expect(label('service')).not.toBeNull();
            expect(label('service')).toBeDefined();
            expect(label('service').tagName).toEqual('LABEL');
        });

        it('label has for attr equal id of the select field', () => {
            render(<AppointmentForm/>);

            {
                const targetId = label('service').getAttribute('for');

                expect(container.querySelector(`#${targetId}`) === field('service')).toBeTruthy();
            }
        });

        it(`save existing name when submitted`, async () => {
            expect.hasAssertions();

            render(<AppointmentForm customer={customer} service={'Qwerty'} selectableServices={['Qwerty', 'Abcdef']}
                                    onSubmit={(form) => {
                                        expect(form.service).toEqual('Qwerty');
                                    }}/>);

            await ReactTestUtils.Simulate.submit(form('appointment'));
        });

        it(`save new name when submitted after click option`, async () => {
            expect.hasAssertions();

            render(<AppointmentForm customer={customer} service={'Qwerty'} selectableServices={['Qwerty', 'Abcdef']}
                                    onSubmit={(form) => {
                                        expect(form.service).toEqual('');
                                        expect(field('service').value).toEqual('');
                                    }}/>);

            await ReactTestUtils.Simulate.click(field('service').childNodes[0]);

            await ReactTestUtils.Simulate.submit(form('appointment'));
        });

        it(`save new custom value when submitted after click option`, async () => {
            expect.hasAssertions();

            render(<AppointmentForm customer={customer} service={'Qwerty'} selectableServices={['Qwerty', 'Abcdef']}
                                    onSubmit={(form) => {
                                        expect(form.service).toEqual('Abcdef');
                                        expect(field('service').value).toEqual('Abcdef');
                                    }}/>);

            await ReactTestUtils.Simulate.click(field('service').childNodes[2]);

            await ReactTestUtils.Simulate.submit(form('appointment'));
        });
    });

    describe('time slot table', () => {
        const timeSlotTable = () => container.querySelector('table#timeslots');

        it('renders a table for time slots', () => {
            render(<AppointmentForm/>);

            expect(timeSlotTable()).not.toBeNull();
        });

        it('renders a time slot for every half an hour between open and close times', () => {
            render(<AppointmentForm salonOpensAt={9} salonClosesAt={11}/>);

            {
                const timesOfDay = timeSlotTable().querySelectorAll('tbody >* th');

                expect(timesOfDay).toHaveLength(4);
                expect(timesOfDay[0].textContent).toEqual('09:00');
                expect(timesOfDay[1].textContent).toEqual('09:30');
                expect(timesOfDay[2].textContent).toEqual('10:00');
                expect(timesOfDay[3].textContent).toEqual('10:30');
            }
        });

        it('render an empty cell at the start of row', () => {
            render(<AppointmentForm/>);

            {
                const firstCell = timeSlotTable().querySelector('thead >* th');

                expect(firstCell).not.toBeNull();
                expect(firstCell).toBeDefined();
                expect(firstCell.textContent).toEqual('');
            }
        });

        it('renders a wekk of available dates', () => {
            const today = new Date(2018, 11, 1);

            render(<AppointmentForm today={today}/>);

            {
                const dates = timeSlotTable().querySelectorAll('thead >* th:not(:first-child)');

                expect(dates).toHaveLength(7);
                expect(dates[0].textContent).toEqual('Sat 01');
                expect(dates[1].textContent).toEqual('Sun 02');
                expect(dates[6].textContent).toEqual('Fri 07');
            }
        });

        it('renders a radio button for each time slot', () => {
            const today = new Date();
            const availableTimeSlots = [
                {startsAt: today.setHours(9, 0, 0, 0)},
                {startsAt: today.setHours(9, 30, 0, 0)}
            ];

            render(<AppointmentForm availableTimeSlots={availableTimeSlots} today={today}/>);

            {
                const cells = timeSlotTable().querySelectorAll('td');

                expect(cells[0].querySelector('input[type="radio"]')).not.toBeNull();
                expect(cells[7].querySelector('input[type="radio"]')).not.toBeNull();
            }
        });

        it('does not render radio buttons for unavailable time slots', () => {
            render(<AppointmentForm availableTimeSlots={[]}/>);

            {
                const timesOfDay = timeSlotTable().querySelectorAll('input');

                expect(timesOfDay).toHaveLength(0);
            }
        });

        it('sets radio button values to the index of the corresponding appointment', () => {
            const today = new Date();
            const availableTimeSlots = [
                {startsAt: today.setHours(9, 0, 0, 0)},
                {startsAt: today.setHours(9, 30, 0, 0)}
            ];

            render(<AppointmentForm availableTimeSlots={availableTimeSlots} today={today}/>);

            expect(startsAtField(0).value).toEqual(availableTimeSlots[0].startsAt.toString());
            expect(startsAtField(1).value).toEqual(availableTimeSlots[1].startsAt.toString());
        });
    });

    it('saves new value when submitted', async () => {
        {
            const today = new Date();
            const availableTimeSlots = [
                {startsAt: today.setHours(9, 0, 0, 0)},
                {startsAt: today.setHours(9, 30, 0, 0)}
            ];

            render(<AppointmentForm
                customer={customer}
                availableTimeSlots={availableTimeSlots}
                today={today}
                startsAt={availableTimeSlots[0].startsAt}
                onSubmit={({startsAt}) => {
                    expect(startsAt).toEqual(availableTimeSlots[1].startsAt);
                }}
            />);

            ReactTestUtils.Simulate.change(startsAtField(1), {
                target: {
                    value: availableTimeSlots[1].startsAt.toString()
                }
            });

            await ReactTestUtils.Simulate.submit(form('appointment'));
        }
    });

    it('passes the customer id to fetch when submitted', async () => {
        render(<AppointmentForm customer={customer}/>);

        await ReactTestUtils.Simulate.submit(form('appointment'));

        expect(window.fetch).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({body: expect.anything()})
        );
    });
});
