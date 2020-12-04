import styled from 'styled-components'

export const Message = styled.div`
    display: flex;
    /* flex-direction: row; */
    justify-content: center;
    align-items: center;
     
    background: ${props => props.color};
    border-radius: 8px;
    width: 300px;
    min-height: 60px;
    margin: 4px;
    img{
        margin-top: 5px;
        width: 80px;
        height: 60px;
        border-radius: 8px;
    }
    .user{
        font-weight: bold;
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