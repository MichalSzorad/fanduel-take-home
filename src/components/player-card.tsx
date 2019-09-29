import React from 'react';
import styled from 'styled-components';

type BackgroundType = 'normal' | 'wrong' | 'correct';

interface Props {
    imageUrl: string;
    name: string;
    fppg: string;
    background?: BackgroundType;
    onChoose?(): void;
}

export default function PlayerCard(props: Props) {
    return <Wrapper onClick={props.onChoose} background={getBackgroundColor(props.background || 'normal')}>
        <Name>{props.name}</Name>
        <Image src={props.imageUrl} width={200} height={200} alt={props.name} />
        <Fppg>FPPG: {props.fppg}</Fppg>
    </Wrapper>;
}

const Wrapper = styled.div<{ background: string }>`
    align-items: center;
    background: ${props => props.background};
    border-radius: 3px;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    height: calc(100% - 20px);
    justify-content: center;
    padding: 10px;
    transition-timing-function: ease;
    transition: .175s transform;
    user-select: none;
    width: calc(100% - 20px);

    :active {
        transform: scale(.95);
    }
`;

const Image = styled.img`
    max-height: 150px;
    max-width: 150px;
`;

const Name = styled.span`
    font-weight: bold;
`;

const Fppg = styled.span`
    font-family: monospace;
    font-size: 1rem;
    font-style: italic;
    padding-top: 10px;
`;

function getBackgroundColor(color: BackgroundType): string {
    switch (color) {
        case 'correct': return '#0c8c29';
        case 'normal': return '#1393FF';
        case 'wrong': return '#b73526';
    }
}
