import styled from 'styled-components';

const Button = styled.button`
    padding: 10px 20px;
    background: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.second};
    font-weight: bold;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    user-select: none;
    box-shadow: -1px 1px 3px #0000007d;
    transition: transform .175s, box-shadow .175s;
    outline: none;

    :hover {
        background: ${props => props.theme.colors.mainActive};
    }

    :active {
        transform: scale(.975);
        box-shadow: -1px 1px 3px #00000033;
    }
`;

Button.defaultProps = {
    theme: {
        colors: {
            main: 'blue',
            second: 'white',
        },
    },
};

export default Button;
