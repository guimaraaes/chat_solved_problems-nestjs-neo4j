import React from 'react'

const Comment = props => {
    return (
        <div className='comment'>
            <a href='/' className='avatar'>
                <img alt='avatar' src={props.avatar} />
            </a>
            <div className='content'>
                <a href='/' className='author'>
                    Zé
            </a>
                <div className='metadata'>
                    <span className='date'>
                        hh:mm
                </span>
                </div>
                < div className='text'> Mensagem </div>
            </div>
        </div>
    )
};

export default Comment;