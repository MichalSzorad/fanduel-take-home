import { fireEvent, getByText, render } from '@testing-library/react';
import React from 'react';
import GamePage from './game-page';

it('should display title', async () => {
    const { findByText } = render(createComponent());
    await findByText('Pick a player with higher FanDuel Points Per Game (FPPG)');
});

it('should init game when rendered', () => {
    const initGame = jest.fn();
    render(createComponent({ initGame }));
    expect(initGame).toHaveBeenCalledTimes(1);
});

it('should display all random players', async () => {
    const { findByText } = render(createComponent({
        randomPlayers: [
            { id: '1', fppg: 123, imageUrl: 'https://example.com/image.png', name: 'Kyle Lowry' },
            { id: '2', fppg: 124, imageUrl: 'https://example.com/image2.png', name: 'Dwyane Wade' },
            { id: '3', fppg: 125, imageUrl: 'https://example.com/image2.png', name: 'John Foo' },
        ],
    }));
    await findByText('Kyle Lowry');
    await findByText('Dwyane Wade');
    await findByText('John Foo');
});

it('should display play again button when game reached it\'s limit and reset the game when user clicks on it', async () => {
    const resetGame = jest.fn();
    const { findByText } = render(createComponent({
        correctGuesses: 10,
        resetGame,
    }));

    fireEvent(await findByText('PLAY AGAIN'), new MouseEvent('click', { bubbles: true }));
    expect(resetGame).toHaveBeenCalledTimes(1);
});

it('should let user know when he guessed right', async () => {
    const { findByText } = render(createComponent({
        randomPlayers: [
            { id: '1', fppg: 123, imageUrl: 'https://example.com/image.png', name: 'Kyle Lowry' },
            { id: '2', fppg: 124, imageUrl: 'https://example.com/image2.png', name: 'Dwyane Wade' },
        ],
        guess: '2',
        isGuessCorrect: true,
    }));
    await findByText('You guessed it Right!');
});

it('should let user know when he guessed wrong', async () => {
    const { findByText } = render(createComponent({
        randomPlayers: [
            { id: '1', fppg: 123, imageUrl: 'https://example.com/image.png', name: 'Kyle Lowry' },
            { id: '2', fppg: 124, imageUrl: 'https://example.com/image2.png', name: 'Dwyane Wade' },
        ],
        guess: '1',
        isGuessCorrect: false,
    }));
    await findByText('Your guess was bad. Try it again!');
});

it('should not display fppg until user made a guess', () => {
    const result1 = render(createComponent({
        randomPlayers: [
            { id: '1', fppg: 123, imageUrl: 'https://example.com/image.png', name: 'Kyle Lowry' },
            { id: '2', fppg: 124, imageUrl: 'https://example.com/image2.png', name: 'Dwyane Wade' },
        ],
        guess: null,
        isGuessCorrect: false,
    }));
    expect(result1.queryByText('FPPG: 123.0')).toBeFalsy();
    expect(result1.queryByText('FPPG: 124.0')).toBeFalsy();

    const result2 = render(createComponent({
        randomPlayers: [
            { id: '1', fppg: 123, imageUrl: 'https://example.com/image.png', name: 'Kyle Lowry' },
            { id: '2', fppg: 124, imageUrl: 'https://example.com/image2.png', name: 'Dwyane Wade' },
        ],
        guess: '2',
        isGuessCorrect: false,
    }));
    expect(result2.queryByText('FPPG: 123.0')).toBeTruthy();
    expect(result2.queryByText('FPPG: 124.0')).toBeTruthy();

});

function createComponent(overrides?: Partial<Parameters<typeof GamePage>[0]>) {
    const props: Parameters<typeof GamePage>[0] = {
        initGame: () => { },
        randomPlayers: [
            { id: '1', fppg: 123, imageUrl: 'https://example.com/image.png', name: 'Kyle Lowry' },
            { id: '2', fppg: 124, imageUrl: 'https://example.com/image2.png', name: 'Dwyane Wade' },
        ],
        correctGuesses: 0,
        guess: null,
        isGuessCorrect: false,
        makeGuess: () => { },
        pickRandomPlayers: () => { },
        resetGame: () => { },
        ...overrides,
    };
    return <GamePage {...props} />;
}
