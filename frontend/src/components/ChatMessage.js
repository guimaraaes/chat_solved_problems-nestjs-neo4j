import React from 'react'
import Message from './Message'
import faker from 'faker'
import * as S from './ChatMessageStyle'
const ChatMessage = () => {
    return (
        <div >

            <S.MessageContent>
                <S.MessageRight>
                    <S.MessageUser>
                        <Message
                            color='#9996'
                            avatar={faker.image.animals()}
                            user=''
                            date=''
                            message='' />

                    </S.MessageUser>
                </S.MessageRight>
                <Message
                    color='#999'
                    avatar={faker.image.animals()}
                    user=''
                    date=''
                    message='' />
                <Message
                    color='#999'
                    avatar={faker.image.animals()}
                    user=''
                    date=''
                    message='' />
                <Message
                    color='#999'
                    avatar={faker.image.animals()}
                    user=''
                    date=''
                    message='' />
            </S.MessageContent>

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

        </div>

    )
}

export default ChatMessage