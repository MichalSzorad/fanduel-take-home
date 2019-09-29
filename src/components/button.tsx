import styled from 'styled-components';

const Button = styled.button`
    padding: 10px 20px;
    background: #1393FF;
    color: #FFFFFF;
    font-weight: bold;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    user-select: none;
    box-shadow: -1px 1px 3px #0000007d;
    transition: transform .175s, box-shadow .175s;
    outline: none;

    :hover {
        background: #0768b9;
    }

    :active {
        transform: scale(.975);
        box-shadow: -1px 1px 3px #00000033;
    }
`;

export default Button;
