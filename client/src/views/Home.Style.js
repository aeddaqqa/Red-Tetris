import styled from "styled-components";
export const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
`;

export const StyledAvatar = styled.div`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.theme.background.primary};
    svg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: ${(props) => props.theme.background.primary};
        background-size: cover;
        background-position: center;
    }
    margin-bottom: 50px;
`;

export const RightSide = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: center; */
    .title {
        margin-bottom: 50px;
        text-align: center;
        font-size: 10rem;
        font-family: ${(props) => props.theme.headers.h1.font};
        color: ${(props) => props.theme.headers.h1.color};
        span {
            color: white;
        }
    }
    .form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        input[type="submit"] {
            height: 3rem;
            border: none;
            cursor: pointer;
            width: 300px;
            padding: 1rem;
            border-radius: 10px;
            background-color: white;
            font-size: ${(props) => props.theme.message.fontSize};
            font-family: ${(props) => props.theme.message.font};
            letter-spacing: ${(props) => props.theme.message.letterSpacing};
            color: ${(props) => props.theme.message.color};
            background: ${(props) => props.theme.message.background};
            border: none;
            outline: none;
            &:focus {
                outline: none;
                border: none;
            }
        }
        .input {
            width: 300px;
            label {
                font-size: 1rem;
                color: white;
            }
            .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
                border-color: #b33030;
            }
        }
    }
    @media (max-width: 768px) {
        width: 100% !important;
    }
`;
