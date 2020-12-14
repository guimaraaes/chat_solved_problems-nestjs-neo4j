import styled from 'styled-components';

export const Container = styled.div`
    position:absolute;
    min-width: 350px;
    h3{
        margin-left: -20px;
    }
    .divided{
        margin-top: -8px;
        /* padding: -4; */
    }
    .InfoClient{
        height: 80%;
    }
`;


export const Content = styled.div`
    overflow-y: scroll;
    position:relative;
    padding:25px;
`;
export const Row = styled.div`
    width: 200px;
    background:#6665;
    display: flex;
    flex-direction: row;
    justify-content: space-between;   
    padding: 4px; 

`;