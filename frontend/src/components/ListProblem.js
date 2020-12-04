import React from 'react'
import * as S from './ListProblemStyle'
import api from '../services/api'

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
                    {this.state.problems.map(i =>
                        <div class="ui relaxed divided list">
                            <div class="item">
                                <div class="content">
                                    <a class="header">{i.type}</a>
                                    <div class="description">{i.description}</div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>

            </S.Container>
        )
    }

}

export default ListProblem