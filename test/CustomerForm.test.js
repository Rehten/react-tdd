import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {createContainer} from "./domManipulators";
import {CustomerForm} from "../src/CustomerForm";

describe('CustomerForm', () => {
    let render, container;
    const form = id => container.querySelector('form[id="' + id + '"]');

    beforeEach(() => {
        ({render, container} = createContainer());
    });

    it('renders a form', () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    });

    it('renders first field as text input', () => {
        render(<CustomerForm />);

        {
            const field = form('customer').elements.firstName;

            expect(field).not.toBeNull();
            expect(field).toBeDefined();
            expect(field.tagName).toEqual('INPUT');
            expect(field.type).toEqual('text');
        }
    });
});
