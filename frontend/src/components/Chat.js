import React from 'react'
import Comment from './Comment'
import faker from 'faker'
const Chat = () => {
    return (
        <div >
            <button>x</button>
            <Comment
                avatar={faker.image.animals()}
                user=''
                date=''
                message='' />
            <Comment
                avatar={faker.image.animals()}
                user=''
                date=''
                message='' />
            <Comment
                avatar={faker.image.animals()}
                user=''
                date=''
                message='' />
            <Comment
                avatar={faker.image.animals()}
                user=''
                date=''
                message='' />
            <form class="ui reply form">
                <div class="field">
                    <input></input>
                </div>
                <div class="ui primary submit labeled icon button">
                    <i class="icon send"></i> Enviar
                </div>
            </form>
        </div>
    )
}

export default Chat