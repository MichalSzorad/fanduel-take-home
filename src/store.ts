import { combineReducers, createStore, Reducer } from 'redux';
import { Actions as GameActions, reducer as gameReducer, State as GameState } from './game';

export interface AppState {
    game: GameState;
}

const rootReducer: Reducer<AppState, GameActions> = combineReducers({
    game: gameReducer,
});

const win = window as any;

const store = createStore(
    rootReducer,
    win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
