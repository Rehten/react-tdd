import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {createContainer} from "./domManipulators";
import {CustomerForm} from "../src/CustomerForm";
import {AppointmentForm} from "../src/AppointmentForm";

describe('CustomerForm', () => {
    let render, container;
    const form = id => container.querySelector('form[id="' + id + '"]');
    const field = name => form('appointment').elements[name];
    const label = name => container.querySelector(`label[for="${name}"]`);
    const findOption = (dropdownNode, textContent) => {
        return Array.from(dropdownNode).find(option => option.textContent === textContent);
    };

    beforeEach(() => {
        ({render, container} = createContainer());
    });

    it('renders a form', () => {
        render(<AppointmentForm />);

        expect(form('appointment')).not.toBeNull();
    });

    describe('service field', () => {
        it('render a select box', () => {
            render(<AppointmentForm />);

            expect(field('service')).not.toBeNull();
            expect(field('service').tagName).toEqual('SELECT');
        });

        it('initially has a blank value', () => {
            render(<AppointmentForm />);

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

            render(<AppointmentForm selectableServices={selectableServices} />);

            {
                const optionNodes = Array.from(field('service').childNodes);

                const renderedServices = optionNodes.map(node => node.textContent);

                expect(renderedServices).toEqual(expect.arrayContaining(selectableServices));
            }
        });

        it('preselects the existing value', () => {
            const services = ['Cut', 'Blow-dry'];

            render(<AppointmentForm selectableServices={services} service='Blow-dry' />);

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

            render(<AppointmentForm service={'Qwerty'} selectableServices={['Qwerty', 'Abcdef']} onSubmit={(form) => {
                expect(form.service).toEqual('Qwerty');
            }} />);

            await ReactTestUtils.Simulate.submit(form('appointment'));
        });

        // it(`save existing name when submitted`, async () => {
        //     expect.hasAssertions();
        //
        //     render(<AppointmentForm service={'Qwerty'} selectableServices={['Qwerty', 'Abcdef']} onSubmit={(form) => {
        //         expect(form.service).toEqual('Abcdef');
        //     }} />);
        //
        //     await ReactTestUtils.Simulate.change(field('service'), {target: {value: 'Abcdef'}});
        //
        //     await ReactTestUtils.Simulate.submit(form('appointment'));
        // });
    });
});
