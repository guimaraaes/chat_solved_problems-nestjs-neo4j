import React from 'react'
import ChatMessage from '../components/ChatMessage'
import ListConversations from '../components/ListConversations'
import * as S from './Styles'
import Header from '../components/Header'
import faker from 'faker'


class Chat extends React.Component {

    render() {
        return <div>

            <Header />
            <S.Container>
                <S.TabChat>
                    {[...Array(5).keys()].map((i) =>
                        <ListConversations avatar={faker.image.animals()
                        } />)}
                </S.TabChat>
                <S.ChatMessage>
                    <ChatMessage />
                </S.ChatMessage>

            </S.Container>
        </div>
    }
}

export default Chat;