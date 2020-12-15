import React from 'react'
import ReactDom from 'react-dom'
import Routes from './routes/routes';
const App = () => <Routes />;

ReactDom.render(<App />, document.querySelector('#root'));