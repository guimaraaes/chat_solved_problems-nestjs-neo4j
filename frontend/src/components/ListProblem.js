import React from 'react'
import * as S from './ListProblemStyle'

class ListProblem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            problems: this.props.problems,
        }
    }


    render() {
        return (

            <S.Container>
                <div class='InfoClient'>
                    <h3>problemas do cliente</h3>
                    <S.Content>
                        {this.state.problems.map(i =>
                            <div class="ui relaxed divided list">
                                <S.Row>
                                    <div class="item">
                                        <a class="header">{i.type}</a>
                                        <div class="description">{i.description}</div>
                                    </div>
                                    <div class="ui submit icon button">
                                        <i class='icon check'> </i>
                                    </div>
                                </S.Row>
                            </div>
                        )}
                    </S.Content>
                </div>

            </S.Container>
        )
    }

}

export default ListProblem