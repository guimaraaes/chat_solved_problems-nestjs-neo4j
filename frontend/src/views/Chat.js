import React from 'react'
import ChatMessage from '../components/ChatMessage'
import ListConversations from '../components/ListConversations'
import * as S from './Styles'
import Header from '../components/Header'
import faker from 'faker'
import api from '../services/api'
import moment from 'moment'
const socket = new window.io('http://localhost:3001/');


class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            staffs: [],
            clients: [],
            chatMessage: [],
            problemDescription: 'null'
        }
        socket.on('connection', data => { console.log(data) });

        this.wsChannel = new URL(window.location.href).searchParams.getAll('id_users').sort().map(Number);
        // console.log(this.wsChannel);
        socket.on(this.wsChannel, (data) => { console.log(data) })
        this.loadUserStaff()
        this.loadUserClients()
        this.loadChat()

        this.handleChange = this.handleChange.bind(this)
        this.onChange = this.onChange.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    async loadUserStaff() {
        await api.get('/user/staffs')
            .then(res => {
                const staffs = res.data.map(i => i)
                this.setState({ staffs })
            })
    }

    async loadUserClients() {
        await api.get('/user/clients')
            .then(res => {
                const clients = res.data.map(i => i)
                this.setState({ clients })
            })
    }

    async loadChat() {
        await api.get('/chat?id_users=125&id_users=126')
            .then(res => {
                const chatMessage = res.data.map(i => i.chatMessage)
                this.setState({ chatMessage })
            })
    }

    async sendMessage() {
        if (this.state.message) {
            await api.post('/chat', {
                id_user_send_message: 126,
                id_users_on_chat: [
                    125, 126
                ],
                message_content: {
                    message: this.state.message,
                    date: moment()
                }
            })
            this.setState({ message: '' })
        }
    }

    async createProblem() {
        if (this.state.problemDescription) {
            await api.post('/problem', {
                id_client: 0,
                id_staff: [],
                description: {
                    message: this.state.problemDescription,
                    date: moment()
                }
            })
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        })

    }


    onChange(e) {
        this.setState(e)
    }


    render() {
        return (
            <>
                <S.Scream>
                    {this.state.problemDescription}
                    <Header
                        problemDescription={this.state.problemDescription}
                        onChange={this.onChange} />
                    <S.Container>

                        <S.Tab >

                            <S.TabChat>
                                <p>Clients</p>
                                {this.state.clients.map(i =>
                                    <ListConversations
                                        username={i.client_name}
                                        type_user='Client'
                                        countProb={i.countProb}
                                        countProbSolv={i.countProbSolv}
                                        avatar={faker.image.animals()}
                                    />
                                )}
                            </S.TabChat>

                            <S.TabChat>
                                <p>Staffs</p>
                                {this.state.staffs.map(i =>
                                    <ListConversations
                                        username={i.staff_name}
                                        type_user='Staff'
                                        countSolv={i.countSolv}
                                        avatar={faker.image.animals()} />
                                )}
                            </S.TabChat>


                        </S.Tab>
                        <S.Chat>
                            <S.ChatMessage>
                                <ChatMessage chatMessage={this.state.chatMessage} />
                            </S.ChatMessage>

                            <S.Send>
                                <div class="ui fluid icon input">
                                    <input
                                        name='message'
                                        type="text"
                                        value={this.state.message}
                                        autocomplete="off"
                                        placeholder="Digite sua mensagem..."
                                        onChange={this.handleChange}
                                    />
                                    <div class="ui primary submit   icon button">
                                        <i class="icon send" onClick={this.sendMessage}></i>
                                    </div>
                                </div>
                            </S.Send>
                        </S.Chat>
                    </S.Container>
                </S.Scream>
            </>
        )

    }
}

export default Chat;