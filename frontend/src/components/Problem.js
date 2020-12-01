import React, { Component } from 'react'
import ListConversations from '../components/ListConversations'
class Problem extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return <div>
            <h1>Cadastrar novo problem</h1>

            <input type='text' placeholder='descrição do problema'></input>
            <button > enviar</button>
            <ListConversations />
        </div>
    }
}

export default Problem;