import React from 'react'
import Message from './Message'
import faker from 'faker'
import * as S from './ChatMessageStyle'
import Moment from 'moment';



class ChatMessage extends React.Component {
    constructor(props) {
        super(props)
        this.name_user = 'Aquino'
    }


    render() {
        return (

            < S.Content >
                <div>
                    {this.props.chatMessage.map(i =>
                        (
                            this.name_user == i.name_user ? (
                                <>
                                    < S.MessageRight >

                                        <S.MessageUser>
                                            <Message
                                                color='#9996'
                                                avatar={faker.image.animals()}
                                                name_user={i.name_user}
                                                date={Moment(i.date).format('HH:mm')}
                                                message={i.message} />

                                        </S.MessageUser>
                                    </S.MessageRight>
                                </>
                            ) :
                                (

                                    <>
                                        < Message
                                            color='#999'
                                            avatar={faker.image.animals()}
                                            name_user={i.name_user}
                                            date={Moment(i.date).format('HH:mm')}
                                            message={i.message} />
                                    </>
                                )
                        )

                    )
                    }

                </div>
            </S.Content >


        )
    }
}
export default ChatMessage