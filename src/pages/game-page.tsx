import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import { Player } from '../game';
import PlayerCard from '../player-card';

interface Props {
    randomPlayers: Player[];
    initGame(): void;
}

export default function GamePage(props: Props) {
    const { randomPlayers, initGame } = props;

    React.useEffect(() => {
        initGame();
    }, []);

    return <div>
        <Wrapper>
            <Container>
                <Heading>Pick a player with higher FanDuel Points Per Game (FPPG)</Heading>
            </Container>
            {randomPlayers.length !== 0 && <Container>
                <Row>
                    <Col md={6}>
                        <PlayerCard
                            name={randomPlayers[0].name}
                            imageUrl={randomPlayers[0].imageUrl}
                            id={randomPlayers[0].id}
                        />
                    </Col>
                    <Col md={6}>
                        <PlayerCard
                            name={randomPlayers[1].name}
                            imageUrl={randomPlayers[1].imageUrl}
                            id={randomPlayers[1].id}
                        />
                    </Col>
                </Row>
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
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
`;
