import styled from 'styled-components';

export const TabChat = styled.div`
    width: 25%;
    display: flex; 
    flex-direction: column;
    justify-content: flex-start; 
    flex-wrap: wrap;
    @media (max-width: 1500px) {
        display:none;
    }
`;

export const Send = styled.div`
    position: fixed;
    bottom: 3%;  
    width: 65%;
    max-width: 900px;
    margin-left: 5%;
    /* background: red; */
    /* margin-left: 5%; */
    
    /* align-self: center; */
    
`;

export const Chat = styled.div`
    display:flex;
     flex-direction: column;
    align-items: center;
    position: relative;
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
    
    height: 78%;
    bottom: 10%;

`;

export const Tab = styled.div`
   height: 800px;
        display: flex;
        
        flex-direction: column;
        justify-content: space-between;
        /* background: red; */

`;
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
    /* position:fixed; */
 
    /* display: flex; */
    /* display: flex; */
    /* position:relative;
    height: 900px; */
`;

export const Screm = styled.div`
  /* position:relative; */
   
    
       /* position:relative;
    height: 900px; */
`;


