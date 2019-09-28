import { render } from '@testing-library/react';
import React from 'react';
import GamePage from './game-page';

it('should render title', async () => {
    const { findByText } = render(<GamePage />);
    await findByText('Pick a player with higher FanDuel Points Per Game (FPPG)');
});

it('should render two players', async () => {
    const { findByText } = render(<GamePage />);
    await findByText('Kyle Lowry');
    await findByText('Dwyane Wade');
});
