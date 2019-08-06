import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();

/**
 * @param {Object} state - 
 *  Example:
 *      {
 *          topic1: [{msg11}, {msg12}, ...],
 *          topic2: [{msg21}, {msg22}, ...]
 *      }
 * @param {Object} action
 * @param {Object} action.payload - 
 *  Example:
 *      {
 *          from: 'user',
 *          msg: 'hi',
 *          topic: 'general'
 *      }
 */
function reducer(state, action) {
    const {from, msg, topic} = action.payload;

    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    { from, msg }
                ]
            }
        default:
            return state
    }
}

const initState = {
    general: [
        {from: 'Aaron', msg: 'hey!'},
        {from: 'Sem', msg: 'hey!'},
        {from: 'Don', msg: 'hey!'}
    ],
    topic2: [
        {from: 'Aaron', msg: 'hey!'},
        {from: 'Aaron', msg: 'hey!'}
    ]
}

let socket;

function sendChatAction(value) {
    socket && socket.emit('chat message', value);
}

export default function Store(props) {

    if (!socket) {
        socket = io(':3001');
    }

    const user = 'Ivan' + Math.random(100).toFixed(2);
    const [allChats] = React.useReducer(reducer, initState);

    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}