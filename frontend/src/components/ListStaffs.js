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

                            {this.props.isOnChat ?
                                this.props.letRemoveCurrentStaff ?
                                    <div class="ui button disable"
                                        onClick={() => {
                                            this.props.remove_staff(this.props.id)
                                        }
                                        }>Remover</div> : null
                                : <div class="ui button disable"
                                    onClick={() => {
                                        this.props.add_staff(this.props.id)
                                    }
                                    }> Adicionar </div>
                            }
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
