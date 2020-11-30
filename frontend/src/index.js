import React from 'react'
import ReactDom from 'react-dom'
import Chat from './components/Chat'
import faker from 'faker'
import TabChats from './components/TabChats'
const App = () => {
    return (

        <div className='ui container comments column grid'>
            <div class="ui segment">
                {[...Array(5).keys()].map((i) => (<TabChats />))}
            </div>

            <div class="ui segment">
                <Chat />
            </div>

        </div>

    );
}

ReactDom.render(<App />, document.querySelector('#root'));