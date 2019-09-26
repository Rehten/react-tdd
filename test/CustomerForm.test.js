import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {createContainer} from "./domManipulators";
import {CustomerForm} from "../src/CustomerForm";

describe('CustomerForm', () => {
    let render, container;
    const form = id => container.querySelector('form[id="' + id + '"]');
    const firstNameField = () => form('customer').elements.firstName;
    const expectToBeInputFieldTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement).toBeDefined();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };
    const labelFor = formElementName => container.querySelector(`label[for="${formElementName}"]`);

    beforeEach(() => {
        ({render, container} = createContainer());
    });

    it('renders a form', () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    });

    it('renders first field as text input', () => {
        render(<CustomerForm />);

        expectToBeInputFieldTypeText(firstNameField());
    });

    it('includes existing value for the first field', () => {
        render(<CustomerForm firstName={'Ashley'} />);

        expect(firstNameField().value).toEqual('Ashley');
    });

    it('render a label for the first name field', () => {
        render(<CustomerForm />);

        expect(labelFor('firstName')).not.toBeNull();
        expect(labelFor('firstName')).toBeDefined();
        expect(labelFor('firstName').tagName).toEqual('LABEL');
        expect(labelFor('firstName').textContent).toEqual('First name');
    });

    it('assigns an id that matches the label id to the first name field', () => {
        render(<CustomerForm />);
        expect(firstNameField().id).toEqual('firstName');
    });
});
