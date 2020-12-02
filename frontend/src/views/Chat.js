import React from 'react'
import ChatMessage from '../components/ChatMessage'
import ListConversations from '../components/ListConversations'
import * as S from './Styles'
import Header from '../components/Header'
import faker from 'faker'
import api from '../services/api'

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [1, 2],
            chatMessage: [],

        }
        this.message = []
        this.loadUser()
        this.loadChat()
    }

    async loadUser() {
        await api.get('/user/125')
            .then(res => {
                const users = res.data.map(i => i)
                this.setState({ users })
            })
    }

    async loadChat() {
        await api.get('/chat?id_users=125&id_users=126')
            .then(res => {
                const chatMessage = res.data.map(i => i.chatMessage)
                this.setState({ chatMessage })

            })
    }
    render() {
        return (
            <>
                <S.Scream>

                    <Header />
                    <S.Container>
                        <S.TabChat>
                            {this.state.users.map(i =>
                                <ListConversations
                                    username={i.name}
                                    type_user={i.type_user}
                                    avatar={faker.image.animals()} />
                            )}
                        </S.TabChat>
                        <S.Chat>
                            <S.ChatMessage>
                                <ChatMessage chatMessage={this.state.chatMessage} />

                            </S.ChatMessage>

                            <S.Send>
                                <form>
                                    <div class="ui fluid icon input">
                                        <input type="text" placeholder="Digite sua mensagem..." />
                                        <div class="ui primary submit labeled icon button">
                                            <i class="icon send"></i> Enviar
                                 </div>
                                    </div>
                                </form>

                            </S.Send>

                        </S.Chat>

                    </S.Container>

                </S.Scream>

            </>
        )

    }
}

export default Chat;