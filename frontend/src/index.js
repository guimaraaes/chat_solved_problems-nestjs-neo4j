import React from 'react'
import ReactDom from 'react-dom'
// import Chat from './views/Chat'
import Login from './views/Login'
const App = () => {
    return (

        <div>
            <Login />
            {/* <Chat /> */}
        </div>

    );
}

ReactDom.render(<App />, document.querySelector('#root'));