import React from 'react'
import * as S from './HeaderStyle'
class Header extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <S.Container>
                <S.TextCenter>
                    chat: nestjs and react js
                </S.TextCenter>

                <S.ButtonLeft>
                    <div className='buttonAdd' class="ui icon button">
                        <i class="icon plus circle"></i>
                    </div>
                </S.ButtonLeft>
            </S.Container>
        );
    }

}
export default Header