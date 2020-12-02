import styled from 'styled-components'

export const Header = styled.div`
    display: flex;
    width: 100%;
    position:relative;
    /* margin-left: 50px;
    margin-right: 50px; */
`;

export const TextCenter = styled.div`
    width: 125%;
    background:gray;
    height: 50px;display: flex;
    justify-content:center;
    align-items: center;
`;

export const ButtonLeft = styled.div`
    width: 25%;
    background:gray;
    height: 50px;
    display: flex;
    padding: 20px;
    
    justify-content: flex-end;
    align-items: center;
`;

export const Container = styled.div`
    display: flex;
    /* position: absolute; */
    flex-direction: column;
    /* align-items: center; */
    justify-content: flex-end;
    align-items: flex-end;
`;
export const Problem = styled.div`
    width:350px;
    display: flex;
    position: absolute;

    
    padding: 40px;
    margin: -180px;
    margin-right: 20px;
    input{
        min-width:200px;
    }
    
    background: gray;
     /* opacity: 0-1; */
    border:solid;
    border-width: 5px;
    border-radius: 5px;
    border-color: gray;
    display: ${props => props.display ? 'none' : 'block'}
    
`;