import React from 'react';
import styled from 'styled-components';

interface Props {
    id: string;
    imageUrl: string;
    name: string;
}

export default function PlayerCard(props: Props) {
    return <Wrapper>
        <Name>{props.name}</Name>
        <Image src={props.imageUrl} />
        <span>{props.id}</span>
    </Wrapper>;
}

const Wrapper = styled.div`
    align-items: center;
    background: #1393FF;
    border-radius: 3px;
    color: #FFFFFF;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    width: calc(100% - 20px);
`;

const Image = styled.img`
    max-height: 150px;
    max-width: 150px;
`;

const Name = styled.span`
    font-weight: bold;
`;
