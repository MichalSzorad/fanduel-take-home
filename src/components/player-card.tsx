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
    return <Wrapper onClick={props.onChoose} background={props.background || 'normal'}>
        <Name>{props.name}</Name>
        <Image src={props.imageUrl} width={200} height={200} alt={props.name} />
        <Fppg>FPPG: {props.fppg}</Fppg>
    </Wrapper>;
}

const Wrapper = styled.div<{ background: BackgroundType }>`
    align-items: center;
    background: ${props => props.theme.colors.card[props.background]};
    border-radius: 3px;
    color: ${props => props.theme.colors.second};
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

Wrapper.defaultProps = {
    theme: {
        colors: {
            second: '#FFFFFF',
            card: {
                normal: 'blue',
                wrong: 'red',
                correct: 'green',
            },
        },
    },
};

const Image = styled.img`
    max-height: 200px;
    max-width: 200px;
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
