import React from 'react'
import * as S from './ListStaffsStyle'
class ListStaffs extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <S.Container>
                <div class="ui middle aligned divided list">
                    <div class="item">
                        <div class="right floated content">
                            <div class="ui button">{
                                this.props.isOnChat ? 'Remover' : 'Adicionar'
                            }</div>
                        </div>
                        <img class="ui avatar image" src={this.props.avatar} />
                        <div class="content">
                            {this.props.username}
                        </div>
                    </div>
                </div>
            </S.Container>
        )
    }

}

export default ListStaffs
