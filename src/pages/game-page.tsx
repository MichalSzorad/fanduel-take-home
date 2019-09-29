import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import { Button } from '../components';
import PlayerCard from '../components/player-card';
import { Player } from '../game';

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
                {guess && isGuessCorrect ? <Row><Col><GuessResult>You guessed it Right!</GuessResult></Col></Row> : null}
                {guess && !isGuessCorrect ? <Row><Col><GuessResult>Your guess was bad. Try it again!</GuessResult></Col></Row> : null}
                {guess && !hasGameEnded ? <Row><Col><Button onClick={handleContinueClick}>CONTINUE</Button></Col></Row> : null}
                {hasGameEnded && <Row><Col><Button onClick={handlePlayAgainClick}>PLAY AGAIN</Button></Col></Row>}
            </Container>}
        </Wrapper>
    </div>;
}

const Heading = styled.h1`
    color: #333333;
`;

const GuessResult = styled.span`
    font-weight: bold;
    margin: 10px;
    display: inline-block;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    min-height: 100vh;
    text-align: center;
`;

function formatFppg(fppg: number): string {
    return fppg.toPrecision(4);
}
