import styled from 'styled-components'

export const Conversation = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 300px;
    min-height: 60px;
    margin: 4px;
    border-radius:5px;
    background: #9996;
    .type{
        font-style: italic;
    }
    .user{
        font-weight: bold;
    }
    .identity{
        position: fixed;
        margin-left: 80px;
    }
    .quantityProblemsSolved{
        color: green;
        font-weight: bold;
    }

    .quantityProblems{
        color: black;
    }
    :hover{
        background: #999
    }
    img{
        margin-top: 5px;
        width: 80px;
        height: 60px;
        border-radius: 8px;
    }
    div{
        padding: 10px;
    }
    `;
