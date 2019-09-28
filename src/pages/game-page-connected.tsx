import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { initGame, selectPlayer } from '../game';
import { AppState } from '../store';
import GamePage from './game-page';

const GamePageConnected = connect(mapStateToProps, mapDispatchToProps)(GamePage);

function mapStateToProps(state: AppState) {
    return {
        randomPlayers: state.game.randomPlayers.map(id => selectPlayer(state.game, id)!),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        initGame: () => initGame(dispatch),
    };
}

export default GamePageConnected;
