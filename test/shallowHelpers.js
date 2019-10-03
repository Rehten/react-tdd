import React from 'react';

export const childrenOf = element => {
    if (typeof element === 'string') {
        return [];
    }

    if (element.props.children) {
        return (typeof element.props.children === 'string') ? [element.props.children] : element.props.children;
    } else {
        return ([]);
    }
};
