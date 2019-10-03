import React from 'react';
import {childrenOf} from './shallowHelpers';

describe('childrenOf', () => {
    it('returns no children', () => {
        expect(childrenOf(<div />)).toEqual([]);
    });

    it('return direct children', () => {
        expect(childrenOf(
            <div>
                <p>A</p>
                <p>B</p>
            </div>
        )).toEqual([<p>A</p>, <p>B</p>]);
    });
});