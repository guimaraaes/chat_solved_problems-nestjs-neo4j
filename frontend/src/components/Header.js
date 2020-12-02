import React from 'react'
import * as S from './HeaderStyle'
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blockProblem: true
        }

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
                    <h1>cadastrar problema</h1>
                    <form>
                        <div class="ui fluid icon input">
                            <input type="text" placeholder="Descreve seu problema..." />
                            <div class="ui primary submit  icon button">
                                <i class="icon plus"></i>
                            </div>
                        </div>
                    </form>
                </S.Problem>
            </S.Container>
        );
    }

}
export default Header