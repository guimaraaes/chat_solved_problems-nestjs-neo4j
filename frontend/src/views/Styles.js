import styled from 'styled-components';

export const TabChat = styled.div`
    width: 25%;
    display: flex; 
    
    flex-direction: column;
    /* justify-content: space-between; */
    justify-content: flex-start; 
    flex-wrap: wrap;
    
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
   
    display: flex;
    flex-direction: column;
    /* height: 80%; */
    justify-content: flex-end;
    /* justify-content: space-between; */
    /* position: static; */

    /* background: red; */
    @media (max-width: 1650px) {
        display:none;
    }
    .InfoClient{
        position: fixed;
        display:flex;
        bottom:5%;
        /* background:red; */
        flex-direction: column;
        justify-content:flex-end;
    }

`;
export const Container = styled.div`
    width: 80%;
    /* height: 800px; */
    position: relative;
    display: flex;
    justify-content: space-around;
    /* : auto; */
    /* justify-content:flex-start; */
    /* align-items: center; */
    /* div{
        background:gray;
    } */
    /* margin: auto; */
    margin: ${props => props.type}; 
    flex-direction: row;

    /* margin:2%;  */
 `;

export const InfoClient = styled.div`
    position: absolute;
    display:flex;
    flex-direction: column;
    justify-content:flex-end;
        /* bottom: 900px; */
        /* bottom: 0;     */
        
        /* background: red; */
`;


export const Scream = styled.div`
    /* position:fixed; */
    /* align-items: center; */
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


