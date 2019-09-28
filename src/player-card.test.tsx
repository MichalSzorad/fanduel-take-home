import { render } from '@testing-library/react';
import React from 'react';
import PlayerCard from './player-card';

it('should render player name, id and image', async () => {
    const { findByText, container } = render(<PlayerCard id="123" imageUrl="https://example.com/image.png" name="Kyle Lowry" />);

    await findByText('Kyle Lowry');
    await findByText('123');
    expect(container.querySelector('img[src="https://example.com/image.png"]')).toBeTruthy();
});
