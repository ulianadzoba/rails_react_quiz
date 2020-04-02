import React from 'react';
import AnswerItem from '../AnswerItem/AnswerItem';
import './AnswerList.css';

const AnswerList = props => (
    <ul className='answer-list'>
        {props.answers.map((answer, answerId) => {
            return (
                <AnswerItem
                    key={answerId}
                    answer={props.answers[answerId]}
                    onAnswerClick={props.onAnswerClick}
                    answerState={props.answerState ? props.answerState[answer.id] : null}
                />
            )
        })
        }

    </ul>

)

export default AnswerList;