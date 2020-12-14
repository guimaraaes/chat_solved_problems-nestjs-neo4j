import styled from 'styled-components'

export const MessageRight = styled.div`
    display: flex;
    justify-content: flex-end;
  `;

export const Send = styled.div`
    min-width: 350px;
    max-width: 800px;
    justify-self:center;
    margin:auto;
    margin-top: 15px;
 
`;

export const MessageContent = styled.div`
    display:flex;
    justify-content: center;
    flex-direction:column; 
    
    height: 700px;
    /* overflow-y: auto;
    overflow-x: hidden; */
    /* bottom: 10%; */
    /* height: 400px; */
    /* position:static; */
    /* height: 10%; */
    /* overflow: auto;
    scroll-snap-align: end; */
`;

export const Content = styled.div`
    /* display:flex; */
     /* flex-direction:column-reverse; */
    position: relative;
    /* background: red; */
    /* overflow: scroll; */
    overflow-y: scroll;
 /* behavior: smooth;
 block: end;;
         */
 
 
`;

export const MessageUser = styled.div`
    display:flex;
    align-items: flex-end;
`;