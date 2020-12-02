import styled from 'styled-components'

export const Message = styled.div`
    display: flex;
    align-items: center;
     
    background: ${props => props.color};
    border-radius: 8px;
    width: 300px;
    margin: 4px;
    img{
        
        width: 80px;
        border-radius: 8px;
    }
    
`;

export const UsernameHour = styled.div`
    padding-left:8px;
    display: flex;
    flex-direction: row;
    width: 200px;
    justify-content: space-between;
`;

export const UsernameMessage = styled.div`
    padding-left:8px;
    display: flex; 
    flex-direction: column;
    height: 50px;
    justify-content: space-between;
`;