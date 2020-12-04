import React from 'react'
import * as S from './MessageStyle'

class Message extends React.Component {
    constructor(props) {
        super(props)

    }
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

                            <a href='/' class='user'>  {this.props.name_user} </a>
                            <div className='metadata'>
                                <span className='date'>
                                    {this.props.date} </span>
                            </div>
                        </S.UsernameHour>
                        < div className='text'> {this.props.message} </div>
                    </S.UsernameMessage>
                </div>
            </S.Message>)
    }
}

export default Message;