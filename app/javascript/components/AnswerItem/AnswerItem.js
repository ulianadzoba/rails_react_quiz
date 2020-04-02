import React from 'react';
import './AnswerItem.css';

const AnswerItem = props => {
    const answers = []
    if (props.answerState) {
        answers.push(props.answerState)
    }
    return (
        <li className={`answer-item ${answers.join('')}`}
            onClick={() => props.onAnswerClick(props.answer.id)} >
            {props.answer.text}
        </li >
    )
}

export default AnswerItem;