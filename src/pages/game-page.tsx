import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import { Player } from '../game';
import PlayerCard from '../player-card';

interface Props {
    randomPlayers: Player[];
    correctGuesses: number;
    guess: string | null;
    isGuessCorrect: boolean;
    initGame(): void;
    pickRandomPlayers(): void;
    makeGuess(playerId: string): void;
    resetGame(): void;
}

const MAX_CORRECT_ROUNDS = 10;

export default function GamePage(props: Props) {
    const { randomPlayers, initGame, pickRandomPlayers, correctGuesses, guess, makeGuess, isGuessCorrect, resetGame } = props;
    const shouldDisplayFppg = guess !== null;
    const hasGameEnded = correctGuesses === MAX_CORRECT_ROUNDS;

    React.useEffect(() => {
        initGame();
    }, []);

    function handleContinueClick() {
        pickRandomPlayers();
    }

    function handleGuess(guessId: string) {
        if (guess !== null) { return; }
        makeGuess(guessId);
    }

    function handlePlayAgainClick() {
        resetGame();
    }

    return <div>
        <Wrapper>
            <Container>
                <Heading>Pick a player with higher FanDuel Points Per Game (FPPG)</Heading>
            </Container>
            {randomPlayers.length > 0 && <Container>
                <Row>{randomPlayers.map((player, i) => <Col key={i} md={6}>
                    <PlayerCard
                        background={guess === player.id ? (isGuessCorrect ? 'correct' : 'wrong') : 'normal'}
                        name={player.name}
                        imageUrl={player.imageUrl}
                        onChoose={() => handleGuess(player.id)}
                        fppg={shouldDisplayFppg ? formatFppg(player.fppg) : '#####'}
                    />
                </Col>)}
                </Row>
                {guess && isGuessCorrect ? <Row><b>You guessed it Right!</b></Row> : null}
                {guess && !isGuessCorrect ? <Row><b>Your guess was bad. Try it again!</b></Row> : null}
                {guess && !hasGameEnded ? <Row><button onClick={handleContinueClick}>CONTINUE</button></Row> : null}
                {hasGameEnded && <button onClick={handlePlayAgainClick}>PLAY AGAIN</button>}
            </Container>}
        </Wrapper>
    </div>;
}

const Heading = styled.h1`
    color: #333333;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    min-height: 100vh;
`;

function formatFppg(fppg: number): string {
    return fppg.toPrecision(4);
}
