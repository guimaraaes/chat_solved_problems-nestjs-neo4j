import styled from 'styled-components';

export const TabChat = styled.div`
    width: 25%;
    display: flex; 
    flex-direction: column;
    justify-content: flex-start; 
    /* display: block; */
    /* position:static; */
    flex-wrap: wrap;
    @media (max-width: 1250px) {
        display:none;
  }
`;
export const Send = styled.div`
    position: fixed;
     
    bottom: 3%;  
    /* min-width: 350px; */
    width: 75%;
    max-width: 850px;
 
 
`;

export const Chat = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* position: fixed; */
    margin:auto;
  
 
`;

export const ChatMessage = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 65%;
    margin-left:5%;
    max-width: 900px;
    min-width: 400px;
    position:fixed;
    overflow-y: auto;
    height: 80%;
    bottom: 10%;

    /* bottom:0; */
    
    
`
export const Container = styled.div`
    width: 80%;
    position: relative;
    display: flex;
    justify-content:flex-start;
    align-items: center;
    flex-direction: row;
    
    margin:2%;
 
 `;

export const Scream = styled.div`
    /* display: flex; */
    /* position:relative;
    height: 900px; */
`;


