import React from 'react'
import api from '../services/api'
import Header from '../components/Header'
import * as S from './Styles'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async login() {
        await api.post('/login', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {

        });
    }

    render() {

        return (
            <>
                <Header />
                <S.Login>

                    <div class="ui form success">
                        <div class="field">
                            <label>E-mail</label>
                            <input type="email" placeholder="joe@schmoe.com" />
                            <input type="password" placeholder="password" />
                        </div>

                        <div class="ui submit button">Entrar</div>
                        <a> Cadastrar-se</a>
                    </div>
                </S.Login >
            </>
        );
    }
}


export default Login;