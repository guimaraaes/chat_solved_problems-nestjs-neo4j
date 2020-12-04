import React from 'react'
import * as S from './HeaderStyle'
import api from '../services/api'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            problems: this.props.problems,
            blockProblem: true,
            problemDescription: this.props.problemDescription
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        })
        this.props.onChange(this.state)
    }

    render() {
        return (
            <S.Container>
                <S.Header>
                    <S.TextCenter>
                        chat: nestjs and react js
                </S.TextCenter>

                    <S.ButtonLeft>
                        <div className='buttonAdd' class="ui icon button" onClick={() => { this.setState({ blockProblem: !this.state.blockProblem }) }}>
                            <i class="icon plus circle"></i>
                        </div>
                    </S.ButtonLeft>
                </S.Header>
                <S.Problem display={this.state.blockProblem}>
                    {this.props.type == 'Staff' ?
                        <>
                            <h1>finalizar problema</h1>
                            <form>
                                <div class="ui action input">
                                    <select class="ui  selection dropdown">
                                        <option value="" selected='true' disabled='disabled'>selecionar</option>
                                        {this.state.problems.map(i =>

                                            <option selected="" value="all">{i.type}</option>
                                        )}
                                    </select>
                                    <div class="ui primary submit  icon button">
                                        <i class="icon check"></i>
                                    </div>
                                </div>
                            </form>
                        </>
                        :
                        <>
                            <h1>cadastrar problema</h1>
                            <form>

                                <div class="ui fluid icon input">

                                    <input name='problemDescription'
                                        value={this.state.problemDescription}
                                        onChange={this.handleChange}
                                        type="text"
                                        placeholder="Descreve seu problema..." />

                                    <div class="ui primary submit  icon button">
                                        <i class="icon plus"></i>
                                    </div>
                                </div>
                            </form>
                        </>
                    }
                </S.Problem>
            </S.Container>
        );
    }

}
export default Header