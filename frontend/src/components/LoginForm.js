import React from 'react'


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true,
        }

        this.validateSingIn = this.validateSingIn.bind(this)
        this.validateSingUp = this.validateSingUp.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        })
        this.props.onChange(e);
    }
    validateSingIn() {
        let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.test(this.state.email))
            alert('Erro: insira um e-mail')
        else if (!this.state.password)
            alert('Erro: insira a senha')
    }

    validateSingUp() {
        let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!this.state.name)
            alert('Erro: insira o nome')
        else if (!this.state.function)
            alert('Erro: selecione a função')
        else if (!email.test(this.state.email))
            alert('Erro: insira um e-mail')
        else if (!this.state.password)
            alert('Erro: insira a senha')
        else if (!(String(this.state.password) === String(this.state.password_confirmation)))
            alert('Erro: senhas diferentes')

    }
    render() {
        return (
            <div>

                {this.state.login ?
                    <div class="ui form success">
                        <div class="field">
                            <label>E-mail</label>
                            <input type="email"
                                name='email'
                                value={this.state.email}
                                onChange={this.handleChange}
                                placeholder="joe@schmoe.com" />
                            <label>Senha</label>
                            <input type="password"
                                name='password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="senha" />
                        </div>
                        <div class="ui submit button"
                            onClick={() => {
                                // this.validateSingIn();
                                this.props.singin();
                            }}
                        >Entrar</div>
                        <a onClick={() => {
                            this.setState({ login: !this.state.login })
                        }}> Cadastrar-se</a>
                    </div>
                    :

                    <div class="ui form success">
                        <div class="field">
                            <label>Função</label>
                            <select name='function' value={this.state.function} onChange={this.handleChange} class="ui dropdown">
                                <option selected disabled hidden>Escolha</option>
                                <option value="Staff">Funcionário</option>
                                <option value="Client">Cliente</option>
                            </select>
                            <label>Nome</label>
                            <input type="text"
                                name='name'
                                value={this.state.name}
                                placeholder="nome completo"
                                onChange={this.handleChange} />
                            <label>E-mail</label>
                            <input type="email"
                                name='email'
                                value={this.state.email}
                                onChange={this.handleChange}
                                placeholder="joe@schmoe.com" />
                            <label>Senha</label>
                            <input type="password"
                                name='password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="senha" />
                            <label>Confirmação senha</label>
                            <input type="password"
                                name='password_confirmation'
                                value={this.state.password_confirmation}
                                onChange={this.handleChange}
                                placeholder="confirmação senha" />
                        </div>
                        <div class="ui submit button"
                            onClick={() => {
                                // this.validateSingUp();
                                this.props.singup();
                            }}
                        >Cadastrar-se</div>
                        <a onClick={() => {
                            this.setState({ login: !this.state.login })
                        }}> Entrar</a>
                    </div>
                }
            </div>
        )
    }

}

export default LoginForm;