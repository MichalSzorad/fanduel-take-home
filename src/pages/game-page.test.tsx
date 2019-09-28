import { render } from '@testing-library/react';
import React from 'react';
import GamePage from './game-page';

it('should render title', async () => {
    const { findByText } = render(<GamePage initGame={() => { }} randomPlayers={[]} />);
    await findByText('Pick a player with higher FanDuel Points Per Game (FPPG)');
});

it('should render two players', async () => {
    const { findByText } = render(<GamePage
        initGame={() => { }}
        randomPlayers={[
            { id: '1', fppg: 123, imageUrl: 'https://example.com/image.png', name: 'Kyle Lowry' },
            { id: '2', fppg: 124, imageUrl: 'https://example.com/image2.png', name: 'Dwyane Wade' },

        ]}
    />);
    await findByText('Kyle Lowry');
    await findByText('Dwyane Wade');
});
