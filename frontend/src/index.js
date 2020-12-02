import React from 'react'
import ReactDom from 'react-dom'
import Chat from './views/Chat'
const App = () => {
    return (

        <div>
            {/* <Home /> */}
            <Chat />
        </div>

    );
}

ReactDom.render(<App />, document.querySelector('#root'));