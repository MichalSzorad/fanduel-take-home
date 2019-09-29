import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { guessCorrectSelector, initGame, makeGuess, randomPlayersSelector, resetStats } from '../game';
import { generateRandomPlayers } from '../game/effects';
import store, { AppState } from '../store';
import GamePage from './game-page';

const GamePageConnected = connect(mapStateToProps, mapDispatchToProps)(GamePage);

function mapStateToProps(state: AppState) {
    return {
        randomPlayers: randomPlayersSelector(state.game),
        correctGuesses: state.game.correctGuesses,
        guess: state.game.guessId,
        isGuessCorrect: guessCorrectSelector(state.game),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    // TODO: do not touch the store
    const pickRandomPlayers = () => dispatch(generateRandomPlayers(store.getState().game.players));
    return {
        initGame: () => initGame(dispatch),
        pickRandomPlayers,
        makeGuess: (guessId: string) => dispatch(makeGuess(guessId)),
        resetGame: () => {
            dispatch(resetStats());
            pickRandomPlayers();
        },
    };
}

export default GamePageConnected;
