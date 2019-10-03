import React from 'react';

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
