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
                <div class="identity">
                    {/* <a class="type">{this.props.type_user}</a> <br /> */}
                    <a class="user">{this.props.username}</a>
                </div>
                {this.props.type_user == 'Client' ? (
                    <div class="divProblems">
                        <a class="quantityProblemsSolved"> {this.props.countProbSolv}</a>/
                        <a class="quantityProblems">{this.props.countProb} </a> <br />problemas
                    </div>

                ) :
                    (
                        <div class="divProblems">
                            <a class="quantityProblemsSolved">{this.props.countSolv} </a>  <br />problemas
                        </div>
                    )
                }

            </S.Conversation>
        )
    }
}

export default ListConversations;