import { render } from '@testing-library/react';
import React from 'react';
import PlayerCard from './player-card';

it('should render player name, image and fppg', async () => {
    const { findByText, container } = render(<PlayerCard fppg="23.34" imageUrl="https://example.com/image.png" name="Kyle Lowry" />);

    await findByText('Kyle Lowry');
    expect(container.querySelector('img[src="https://example.com/image.png"]')).toBeTruthy();
    await findByText('FPPG: 23.34');
});
