import React from 'react'
import Message from './Message'
import faker from 'faker'
import * as S from './ChatMessageStyle'
import Moment from 'moment';


class ChatMessage extends React.Component {
    constructor(props) {
        super(props)
        this.id_user = this.props.id_user



    }
    scrollToBottom = () => {
        // this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
        this.messagesEnd && this.messagesEnd.scrollIntoView({ behavior: "smooth", block: 'end' });

        // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();

    }


    // componentDidUpdate() {
    //     this.scrollToBottom();
    // }

    render() {
        return (

            < S.Content >
                <div className="messagesEnd" ref={(elem) => this.messagesEnd = elem} >
                    {this.props.chatMessage.map(i =>
                        (
                            Number(this.id_user) === i.id_user ? (
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