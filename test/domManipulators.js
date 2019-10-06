import ReactDOM from 'react-dom';
import ReactTestUtils, {act} from 'react-dom/test-utils';

const simulateEvent = eventName => (element, eventData) => ReactTestUtils.Simulate[eventName](element, eventData);

export const createContainer = () => {
    const container = document.createElement('div');

    return {
        renderAndWait: async component => await act(async () => ReactDOM.render(component, container)),
        render: component => act(() => {
            ReactDOM.render(component, container)
        }),
        container,
        blur: simulateEvent('blur')
    };
};
