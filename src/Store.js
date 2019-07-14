import React from 'react';

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

export default function Store(props) {
    const reducerHook = React.useReducer(reducer, initState);

    return (
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}