import React from 'react'
import api from '../services/api'
import Header from '../components/Header'
import * as S from './Styles'
import LoginForm from '../components/LoginForm'
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.singin = this.singin.bind(this)
        this.singup = this.singup.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    async singin() {
        await api.post('/auth/singin', {
            username: String(this.state.email),
            password: String(this.state.password)
        })
    }

    async singup() {
        const response = await api.post('/auth/singup?type=' + String(this.state.function), {
            name: String(this.state.name),
            username: String(this.state.email),
            password: String(this.state.password)
        })
        alert(response)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }
    render() {

        return (
            <>
                <Header type='' />
                <S.Login>
                    <LoginForm
                        singin={this.singin}
                        singup={this.singup}
                        onChange={this.handleChange}
                    />
                </S.Login >
            </>
        );
    }
}


export default Login;