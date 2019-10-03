import React from 'react';

export const childrenOf = element => {
    if (element.props.children) {
        return element.props.children;
    } else {
        return ([]);
    }
};
