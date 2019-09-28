import { Actions, loadGameBegin, loadGameRejected, loadGameSuccess, makeGuess, resetGame } from './actions';
import { Player } from './player';
import { reducer, State } from './store';

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
});

describe('initial state', () => {
    it('should not have any players loaded', () => {
        expect(reducer(undefined, { type: '@@init' } as any).players).toEqual([]);
    });
});

function reduce(action: Actions): State {
    return reducer(undefined, action);
}
