import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, {act} from 'react-dom/test-utils';
import {createContainer} from "./domManipulators";
import {CustomerForm} from "../src/CustomerForm";

// расширение Jest - проверка вызова функции
expect.extend({
    toHaveBeenCalled(received) {
        if (received.receivedArguments() === undefined) {
            return {
                pass: false,
                message: () => 'Spy was not called.'
            }
        } else {
            return {pass: true, message: () => 'Spy was called!'};
        }
    }
});

describe('CustomerForm', () => {
    let render, container;
    const form = id => container.querySelector('form[id="' + id + '"]');
    const field = name => form('customer').elements[name];
    const expectToBeInputFieldTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement).toBeDefined();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };
    const labelFor = formElementName => container.querySelector(`label[for="${formElementName}"]`);
    const spy = () => {
        let receivedArguments;
        let returnValue;

        return {
            fn: (...args) => {
                (receivedArguments = args);

                return returnValue;
            },
            receivedArguments: () => receivedArguments,
            receivedArgument: (index) => receivedArguments[index],
            stubReturnValue: value => (returnValue = value)
        };
    };
    const fetchSpy = spy();
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

    const fetchResponseOk = body => Promise.resolve({ok: true, json: () => Promise.resolve(body)});
    const fetchResponseError = () => Promise.resolve({ok: false});

    beforeEach(() => {
        ({render, container} = createContainer());
        window.fetch = fetchSpy.fn;
        fetchSpy.stubReturnValue(fetchResponseOk({}));
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

        fetchSpy.stubReturnValue(fetchResponseOk(customer));

        {
            const saveSpy = spy();

            render(<CustomerForm onSave={saveSpy.fn} />);

            await act(async () => {
                ReactTestUtils.Simulate.submit(form('customer'))
            });

            expect(saveSpy).toHaveBeenCalled();
            expect(saveSpy.receivedArgument(0)).toEqual({id: 123});
        }
    });

    it('does not call onSave if the post request returns an error', async () => {
        fetchSpy.stubReturnValue(fetchResponseError());

        {
            const saveSpy = spy();

            render(<CustomerForm onSave={saveSpy.fn} />);

            await act(async () => {
                ReactTestUtils.Simulate.submit(form('customer'))
            });

            expect(saveSpy).not.toHaveBeenCalled();
        }
    });

});
