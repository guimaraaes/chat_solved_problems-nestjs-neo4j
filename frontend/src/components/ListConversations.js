import React from 'react'
import * as S from './ListConversationsStyle'


class ListConversations extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <S.Conversation>
                <a class="avatar">
                    <img alt='avatar' src={this.props.avatar} />
                </a>
                <div class="content">
                    <a class="author">{this.props.type_user + ': ' + this.props.username}</a>
                </div>
            </S.Conversation>
        )
    }
}

export default ListConversations;