import {beforeEach, describe, expect, it} from 'vitest';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import SpecificationRow from '../specification';

describe(
    'Specification',
    () => {
        beforeEach(() =>
            render(
                <SpecificationRow
                    label='Lorem'
                    mobile_label='Ipsum'
                    value='Lipsum'
                    darkMode={false}/>
            )
        );

        it(
            'test',
            async () => {
                expect(await screen.findByText('Lorem')).toBeInTheDocument();
                expect(await screen.findByText('Ipsum')).toBeInTheDocument();
                expect(await screen.findByText('Lipsum')).toBeInTheDocument();
            },
        );
    },
);
