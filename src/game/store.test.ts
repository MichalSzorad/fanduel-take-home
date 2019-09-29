import { Actions, loadGameBegin, loadGameRejected, loadGameSuccess, makeGuess, pickRandomPlayers, resetStats } from './actions';
import { Player } from './player';
import { guessCorrectSelector, randomPlayersSelector, randomPlayerWithHighestFppgSelector, reducer, State } from './store';

describe('actions', () => {

    it('loadGameBegin should set game state to "loading"', () => {
        expect(reduce(loadGameBegin()).initState).toEqual('loading');
    });

    it('loadGameRejected should set game state to "rejected"', () => {
        expect(reduce(loadGameRejected()).initState).toEqual('rejected');
    });

    it('loadGameSuccess should set game state to "initialized"', () => {
        expect(reduce(loadGameSuccess([])).initState).toEqual('initialized');
    });

    it('loadGameSuccess should set players in game', () => {
        const player: Player = { id: 'id', fppg: 1, imageUrl: 'https://example.com/image.png', name: 'foo' };
        expect(reduce(loadGameSuccess([player])).players).toEqual([player]);
    });

    it('pickRandomPlayers should put players into state', () => {
        expect(reduce(pickRandomPlayers(['id-1', 'id-3'])).randomPlayers).toEqual(['id-1', 'id-3']);
    });

    it('resetStats should reset correctGuesses', () => {
        expect(reducer(createState({ correctGuesses: 5, initState: 'initialized' }), resetStats()).correctGuesses).toEqual(0);
    });

    it('makeGuess should increase correctGuesses if guess was correct and should store guess', () => {
        const playerA: Player = { id: 'id-1', fppg: 1, imageUrl: 'https://example.com/image.png', name: 'foo' };
        const playerB: Player = { id: 'id-2', fppg: 2, imageUrl: 'https://example.com/image.png', name: 'foo' };

        expect(reducer({
            correctGuesses: 0,
            initState: 'initialized',
            guessId: null,
            players: [playerA, playerB],
            randomPlayers: ['id-1', 'id-2'],
        }, makeGuess('id-1'))).toMatchObject({ correctGuesses: 0, guessId: 'id-1' });

        expect(reducer({
            correctGuesses: 0,
            initState: 'initialized',
            guessId: null,
            players: [playerA, playerB],
            randomPlayers: ['id-1', 'id-2'],
        }, makeGuess('id-2'))).toMatchObject({ correctGuesses: 1, guessId: 'id-2' });
    });
});

describe('selectors', () => {
    it('randomPlayersSelector should select full player objects from players slice', () => {
        const playerA: Player = { id: 'id-1', fppg: 1, imageUrl: 'https://example.com/image.png', name: 'foo' };
        const playerB: Player = { id: 'id-2', fppg: 2, imageUrl: 'https://example.com/image.png', name: 'foo' };
        const playerC: Player = { id: 'id-3', fppg: 3, imageUrl: 'https://example.com/image.png', name: 'foo' };

        expect(randomPlayersSelector(createState({
            players: [playerA, playerB, playerC],
            randomPlayers: ['id-2', 'id-3'],
        }))).toEqual([playerB, playerC]);
    });

    it('randomPlayerWithHighestFppgSelector should select player from random players with highest fppg', () => {
        const playerA: Player = { id: 'id-1', fppg: 1, imageUrl: 'https://example.com/image.png', name: 'foo' };
        const playerB: Player = { id: 'id-2', fppg: 2, imageUrl: 'https://example.com/image.png', name: 'foo' };
        const playerC: Player = { id: 'id-3', fppg: 3, imageUrl: 'https://example.com/image.png', name: 'foo' };

        expect(randomPlayerWithHighestFppgSelector(createState({
            players: [playerA, playerB, playerC],
            randomPlayers: ['id-2', 'id-3', 'id-1'],
        }))).toEqual(playerC);
    });

    it('guessCorrectSelector should return true if user selected player with highest fppg', () => {
        const playerA: Player = { id: 'id-1', fppg: 1, imageUrl: 'https://example.com/image.png', name: 'foo' };
        const playerB: Player = { id: 'id-2', fppg: 2, imageUrl: 'https://example.com/image.png', name: 'foo' };
        const playerC: Player = { id: 'id-3', fppg: 3, imageUrl: 'https://example.com/image.png', name: 'foo' };

        expect(guessCorrectSelector(createState({
            players: [playerA, playerB, playerC],
            randomPlayers: ['id-2', 'id-3', 'id-1'],
            guessId: null,
        }))).toEqual(false);

        expect(guessCorrectSelector(createState({
            players: [playerA, playerB, playerC],
            randomPlayers: ['id-2', 'id-3', 'id-1'],
            guessId: 'id-2',
        }))).toEqual(false);

        expect(guessCorrectSelector(createState({
            players: [playerA, playerB, playerC],
            randomPlayers: ['id-2', 'id-3', 'id-1'],
            guessId: 'id-3',
        }))).toEqual(true);
    });
});

function reduce(action: Actions): State {
    return reducer(undefined, action);
}

function createState(overrides: Partial<State>): State {
    return {
        correctGuesses: 0,
        initState: 'initialized',
        guessId: null,
        players: [],
        randomPlayers: [],
        ...overrides,
    };
}
