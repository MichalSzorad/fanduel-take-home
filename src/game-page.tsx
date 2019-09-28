import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import PlayerCard from './player-card';

export default function GamePage() {
    return <div>
        <Wrapper>
            <Container>
                <Heading>Pick a player with higher FanDuel Points Per Game (FPPG)</Heading>
            </Container>
            <Container>
                <Row>
                    <Col md={6}>
                        <PlayerCard
                            name="Kyle Lowry"
                            imageUrl="https://d17odppiik753x.cloudfront.net/playerimages/nba/9535.png"
                            id="15475-9535"
                        />
                    </Col>
                    <Col md={6}>
                        <PlayerCard
                            name="Dwyane Wade"
                            imageUrl="https://d17odppiik753x.cloudfront.net/playerimages/nba/9585.png"
                            id="15475-9585"
                        />
                    </Col>
                </Row>
            </Container>

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
