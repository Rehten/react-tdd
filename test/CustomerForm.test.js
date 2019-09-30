import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
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
    const singleArgumentSpy = () => {
        let receivedArguments;

        return {
            fn: (...args) => (receivedArguments = args),
            receivedArguments: () => receivedArguments,
            receivedArgument: (index) => receivedArguments[index]
        };
    };
    const fetchSpy = singleArgumentSpy();

    // Generalization of tests
    const itRendersAsATextBox = (fieldName) => {
        it(`renders ${fieldName} as text input`, () => {
            render(<CustomerForm />);

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
            render(<CustomerForm />);

            expect(labelFor(fieldName)).not.toBeNull();
            expect(labelFor(fieldName)).toBeDefined();
            expect(labelFor(fieldName).tagName).toEqual('LABEL');
            expect(labelFor(fieldName).textContent).toEqual(labelText);
        });
    };
    const itAssignsAnIdThatMatchesTheLabelIdToTheFieldName = (fieldName) => {
        it(`assigns an id that matches the label id to the ${fieldName} field`, () => {
            render(<CustomerForm />);
            expect(field(fieldName).id).toEqual(fieldName);
        });
    };

    const itSaveExistingFieldDataWhenSubmitting = (fieldName) => {
        it(`save existing ${fieldName} when submitted`, async () => {
            const spy = singleArgumentSpy();

            render(<CustomerForm
                {...{[fieldName]: 'value'}}
                onSubmit={spy.fn}
                fetch={fetchSpy.fn}
            />);

            ReactTestUtils.Simulate.submit(form('customer'));

            expect(spy).toHaveBeenCalled();
            expect(spy.receivedArguments()).toBeDefined();
            expect(spy.receivedArgument(0)[fieldName]).toEqual('value');
        });
    };

    const itSavesNewNameWhenSubmitted = (fieldName, fieldValue, newFieldValue) => {
        it('saves new name when submitted', async () => {
            expect.hasAssertions();

            render(<CustomerForm {...{[fieldName]: fieldValue}} onSubmit={(form) => {
                expect(form[fieldName]).toEqual(newFieldValue);
            }} fetch={fetchSpy.fn} />);

            await ReactTestUtils.Simulate.change(field(fieldName), { target: {value: newFieldValue, name: fieldName}});

            await ReactTestUtils.Simulate.submit(form('customer'));
        });
    };

    beforeEach(() => {
        ({render, container} = createContainer());
    });

    it('renders a form', () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    });

    describe('first name field', () => {
        itRendersAsATextBox('firstName');

        itIncludesTheExistingValue('firstName', 'Ashley');

        itRenderALabelForField('firstName', 'First name');

        itAssignsAnIdThatMatchesTheLabelIdToTheFieldName('firstName');

        itSaveExistingFieldDataWhenSubmitting('firstName');

        itSavesNewNameWhenSubmitted('firstName', 'Ashley', 'Jamie');
    });

    describe('last name field', () => {
        itRendersAsATextBox('lastName');

        itIncludesTheExistingValue('lastName', 'Green');

        itRenderALabelForField('lastName', 'Last name');

        itAssignsAnIdThatMatchesTheLabelIdToTheFieldName('lastName');

        itSaveExistingFieldDataWhenSubmitting('lastName');

        itSavesNewNameWhenSubmitted('lastName', 'Green', 'Blue');
    });

    describe('phone number field', () => {
        itRendersAsATextBox('phoneNumber');

        itIncludesTheExistingValue('phoneNumber', '79125577556');

        itRenderALabelForField('phoneNumber', 'Phone number');

        itAssignsAnIdThatMatchesTheLabelIdToTheFieldName('phoneNumber');

        itSaveExistingFieldDataWhenSubmitting('phoneNumber');

        itSavesNewNameWhenSubmitted('phoneNumber', '79125577556', '79865522883');
    });

    it('has a submit button', () => {
        render(<CustomerForm/>);

        expect(container.querySelector('input[type="submit"]')).not.toBeNull();
        expect(container.querySelector('input[type="submit"]')).toBeDefined();
        expect(container.querySelector('input[type="submit"]').value).toEqual('Add');
    });

    it('calls the fetch with the right properties when submitting data', async () => {

        render(<CustomerForm fetch={fetchSpy.fn} onSubmit={() => {}} />);

        ReactTestUtils.Simulate.submit(form('customer'));

        expect(fetchSpy).toHaveBeenCalled();
        expect(fetchSpy.receivedArgument(0)).toEqual('/customers');

        {
            const fetchOpts = fetchSpy.receivedArgument(1);

            expect(fetchOpts.method).toEqual('POST');
            expect(fetchOpts.credentials).toEqual('same-origin');
            expect(fetchOpts.headers).toEqual({'Content-Type': 'application/json'});
        }
    });

});
