import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, {act} from 'react-dom/test-utils';
import {createContainer} from "./domManipulators";
import {CustomerForm} from "../src/CustomerForm";
import {fetchResponseError, fetchResponseOk} from "./spyHelpers";

describe('CustomerForm', () => {
    let render, container, blur;
    const form = id => container.querySelector('form[id="' + id + '"]');
    const field = name => form('customer').elements[name];
    const expectToBeInputFieldTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement).toBeDefined();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };
    const labelFor = formElementName => container.querySelector(`label[for="${formElementName}"]`);
    const fetchSpy = jest.fn(() => fetchResponseOk({}));
    const originalFetch = window.fetch;

    // Generalization of tests
    const itRendersAsATextBox = (fieldName) => {
        it(`renders ${fieldName} as text input`, () => {
            render(<CustomerForm/>);

            expectToBeInputFieldTypeText(field(fieldName));
        });
    };
    const itIncludesTheExistingValue = (fieldName, value) => {
        it(`includes existing value for the ${fieldName} field`, () => {
            render(<CustomerForm {...{[fieldName]: value}} />);

            expect(field(fieldName).value).toEqual(value);
        });
    };
    const itRenderALabelForField = (fieldName, labelText) => {
        it(`render a label for the ${fieldName} field`, () => {
            render(<CustomerForm/>);

            expect(labelFor(fieldName)).not.toBeNull();
            expect(labelFor(fieldName)).toBeDefined();
            expect(labelFor(fieldName).tagName).toEqual('LABEL');
            expect(labelFor(fieldName).textContent).toEqual(labelText);
        });
    };
    const itAssignsAnIdThatMatchesTheLabelIdToTheFieldName = (fieldName) => {
        it(`assigns an id that matches the label id to the ${fieldName} field`, () => {
            render(<CustomerForm/>);
            expect(field(fieldName).id).toEqual(fieldName);
        });
    };

    beforeEach(() => {
        ({render, container, blur} = createContainer());
        window.fetch = fetchSpy;
        jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk({}));
    });

    afterEach(() => {
        window.fetch = originalFetch;
    });

    it('renders a form', () => {
        render(<CustomerForm/>);
        expect(form('customer')).not.toBeNull();
    });

    describe('first name field', () => {
        itRendersAsATextBox('firstName');

        itIncludesTheExistingValue('firstName', 'Ashley');

        itRenderALabelForField('firstName', 'First name');

        itAssignsAnIdThatMatchesTheLabelIdToTheFieldName('firstName');
    });

    describe('last name field', () => {
        itRendersAsATextBox('lastName');

        itIncludesTheExistingValue('lastName', 'Green');

        itRenderALabelForField('lastName', 'Last name');

        itAssignsAnIdThatMatchesTheLabelIdToTheFieldName('lastName');
    });

    describe('phone number field', () => {
        itRendersAsATextBox('phoneNumber');

        itIncludesTheExistingValue('phoneNumber', '79125577556');

        itRenderALabelForField('phoneNumber', 'Phone number');

        itAssignsAnIdThatMatchesTheLabelIdToTheFieldName('phoneNumber');
    });

    it('has a submit button', () => {
        render(<CustomerForm/>);

        expect(container.querySelector('input[type="submit"]')).not.toBeNull();
        expect(container.querySelector('input[type="submit"]')).toBeDefined();
        expect(container.querySelector('input[type="submit"]').value).toEqual('Add');
    });

    it('notifies onSave when form is submitted', async () => {
        const customer = {id: 123};

        fetchSpy.mockReturnValue(fetchResponseOk(customer));

        {
            const saveSpy = jest.fn();

            render(<CustomerForm onSave={saveSpy} />);

            await act(async () => {
                ReactTestUtils.Simulate.submit(form('customer'))
            });

            expect(saveSpy).toHaveBeenCalled();
            expect(saveSpy).toHaveBeenCalledWith({id: 123});
        }
    });

    it('does not call onSave if the post request returns an error', async () => {
        fetchSpy.mockReturnValue(fetchResponseError());

        {
            const saveSpy = jest.fn();

            render(<CustomerForm onSave={saveSpy} />);

            await act(async () => {
                ReactTestUtils.Simulate.submit(form('customer'));
            });

            expect(saveSpy).not.toHaveBeenCalled();
        }
    });

    it('prevents the default action when submitting the form', async () => {
        const preventDefaultSpy = jest.fn();

        render(<CustomerForm />);

        await act(async () => {
            ReactTestUtils.Simulate.submit(form('customer'), {preventDefault: preventDefaultSpy});
        });

        expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('renders error message when fetch call fails', async () => {
        fetchSpy.mockReturnValue(fetchResponseError());

        render(<CustomerForm/>);

        await act(async () => {
            ReactTestUtils.Simulate.submit(form('customer'));
        });

        {
            const errorElement = container.querySelector('.error');

            expect(errorElement).not.toBeNull();
            expect(errorElement.textContent).toMatch('error occured');
        }
    });

    it('displays error after blur when first name field is blank', () => {
        render(<CustomerForm />);

        blur(field('firstName'), new Event('blur'));

        expect(container.querySelector('.error')).not.toBeNull();
        expect(container.querySelector('.error').textContent).toMatch('First name is required');
    });

});
