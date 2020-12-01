import React from 'react'
import * as S from './MessageStyle'

class Message extends React.Component {
    // constructor(props) {
    //     super(props)

    // }
    render() {
        return (
            <S.Message color={this.props.color}>

                <a href='/' className='avatar'>
                    {/* <img alt='avatar' /> */}
                    <img alt='avatar' src={this.props.avatar} />
                </a>
                <div className='content'>
                    <S.UsernameMessage>
                        <S.UsernameHour>

                            <a href='/' className='author'> Zé </a>
                            <div className='metadata'>
                                <span className='date'>
                                    hh:mm </span>
                            </div>
                        </S.UsernameHour>
                        < div className='text'> Mensagem </div>
                    </S.UsernameMessage>
                </div>
            </S.Message>)
    }
}

export default Message;