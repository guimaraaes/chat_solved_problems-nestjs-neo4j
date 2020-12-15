import React from 'react'
import ChatMessage from '../components/ChatMessage'
import ListConversations from '../components/ListConversations'
import * as S from './Styles'
import Header from '../components/Header'
import faker from 'faker'
import api from '../services/api'
import moment from 'moment'
import ListProblem from '../components/ListProblem'
import ListStaffs from '../components/ListStaffs'

const socket = new window.io('http://localhost:3001/');

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            staffs: [],
            clients: [],
            chatMessage: [],
            problems: [],
            problemDescription: 'null',
            id_client: null
        }

        socket.on('connection', data => { console.log(data) })
        this.id_user = new URL(window.location.href).searchParams.get('id_current_user');
        this.wsChannel = new URL(window.location.href).searchParams.getAll('id_users').sort().map(Number);
        this.wsChannelSearch = ''
        this.wsChannel.map(i => this.wsChannelSearch = this.wsChannelSearch + ("&id_users=" + i))
        this.wsChannelSearch = this.wsChannelSearch.substring(1)
        this.location = new URL(window.location.href)
        socket.on(this.wsChannel, (data) => {
            console.log(data);
            this.setState({
                chatMessage: this.state.chatMessage.concat(data)
            })
        })
        this.type = 'Staff'

        this.loadUserStaff()
        this.loadUserClients()
        this.loadChat()
        this.loadUserStaff = this.loadUserStaff.bind(this)
        this.loadUserClients = this.loadUserClients.bind(this)
        this.loadChat = this.loadChat.bind(this)

        this.handleChange = this.handleChange.bind(this)
        this.createProblem = this.createProblem.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.solveProblem = this.solveProblem.bind(this)
        this.add_staff = this.add_staff.bind(this)
        this.remove_staff = this.remove_staff.bind(this)
    }

    async loadUserStaff() {
        await api.get('/user/staffs/')
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
        // alert(this.wsChannelSearch)
        await api.get('/chat?' + this.wsChannelSearch)
            .then(res => {
                const chatMessage = res.data.map(i => i)
                this.setState({ chatMessage })
                this.setState({ id_client: chatMessage[0].id_user })
                this.setState({ id_chat: chatMessage[0].id_chat })
            })
        if (this.state.id_client === Number(this.id_user))
            this.type = 'Client'
        await api.get('/problem/client/' + Number(this.state.id_client))
            .then(res => {
                // alert(this.state.id_client)
                const problems = res.data.map(i => i)
                this.setState({ problems })
                // alert(this.state.problems)
            })
    }

    async sendMessage() {
        if (this.state.message) {
            await api.post('/chat', {
                id_user_send_message: Number(this.id_user),
                id_users_on_chat: this.wsChannel,
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
                id_client: this.id_client,
                id_staff: [],
                description: {
                    message: this.state.problemDescription,
                    date: moment()
                }
            })
        }
    }

    async solveProblem() {
        await api.put('problem/solved/'
            + this.state.id_problem + '/'
            + this.state.id_staff + '/'
            + this.state.avaliation
        )
    }

    async add_staff(id_staff) {
        await api.put('/chat/add_user/' + Number(this.state.id_chat) + '/' + Number(id_staff))
        window.location.replace(this.location + '&id_users=' + id_staff)

    }

    async remove_staff(id_staff) {
        await api.put('/chat/remove_user/' + Number(this.state.id_chat) + '/' + Number(id_staff))
        window.location.replace(
            '/?id_current_user=' + this.id_user +
            this.wsChannel.filter((item) => {
                return item != id_staff
            }).map((i) => {
                return '&id_users=' + (i)
            }).join("")
        )
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }

    render() {
        return (
            (!this.state.id_client) || (this.state.problems.length == 0) ?
                <>
                    Carregando
                </>
                :
                <>
                    < S.Scream >
                        < Header
                            type={this.type}
                            id_client={this.state.id_client}
                            problems={this.state.problems}
                            problemDescription={this.state.problemDescription}
                            onChange={this.handleChange}
                            createProblem={this.createProblem}
                            solveProblem={this.solveProblem}
                        />
                        <S.Container type={this.type === 'Client' ? 'auto' : '2%'}>
                            {this.type === 'Staff' ?
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
                                        {this.state.staffs.map(i => <>
                                            <ListStaffs
                                                letRemoveCurrentStaff={this.wsChannel.length > 2}
                                                isOnChat={this.wsChannel.includes((i.id)) ? true : false}
                                                username={i.staff_name}
                                                id={i.id}
                                                add_staff={this.add_staff}
                                                remove_staff={this.remove_staff}
                                                avatar={faker.image.animals()}
                                            />
                                        </>
                                        )}
                                    </S.TabChat>
                                </S.Tab>
                                : null}
                            <S.Chat>
                                <S.ChatMessage>
                                    <ChatMessage
                                        id_user={this.id_user}
                                        chatMessage={this.state.chatMessage}
                                    />
                                </S.ChatMessage>

                                <S.Send>
                                    <div class="ui fluid icon input">
                                        <input
                                            autofocus="autofocus"
                                            onKeyDown={(e) => {
                                                if (e.which == 13)
                                                    this.sendMessage()
                                            }}
                                            name='message'
                                            type="text"
                                            value={this.state.message}
                                            autocomplete="off"
                                            placeholder="Digite sua mensagem..."
                                            onChange={this.handleChange}
                                        />
                                        <div class="ui primary submit   icon button">
                                            <i class="icon send" onClick={() => { this.sendMessage() }}></i>
                                        </div>
                                    </div>
                                </S.Send>
                            </S.Chat>
                            {this.type === 'Staff' ?
                                <S.Tab>
                                    <ListProblem
                                        id_client={this.state.id_client}
                                        problems={this.state.problems}
                                    />
                                </S.Tab>
                                : null}
                        </S.Container>
                    </S.Scream>
                </>
        )

    }
}

export default Chat;