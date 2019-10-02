import ReactDOM from 'react-dom';
import ReactTestUtils, {act} from 'react-dom/test-utils';

export const createContainer = () => {
    const container = document.createElement('div');

    return {
        render: component => act(() => {
            ReactDOM.render(component, container)
        }),
        container
    };
};
