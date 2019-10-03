import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'

export const childrenOf = element => {
    if (typeof element === 'string') {
        return [];
    }

    if (typeof element.props.children === 'string') {
        return [element.props.children];
    }

    if (Array.isArray(element.props.children)) {
        return element.props.children;
    }

    if (element.props.children) {
        return [element.props.children];
    } else {
        return ([]);
    }
};

export const createShallowRenderer = () => {
    let renderer = new ShallowRenderer();

    return {
        render: component => renderer.render(component),
        child: n => undefined
    };
};
