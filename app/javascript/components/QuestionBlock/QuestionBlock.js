import React, {Component} from 'react';
import './QuestionBlock.css';
import AnswerList from '../AnswerList/AnswerList';


const QuestionBlock = (props) => (
    <div className='question'>
       <div className='page-block'>
        <div className='question-title'>
            {props.id}. {props.title}
        </div>
        <div className='current-question'>
            <span>{`${props.currentQuestion} of ${props.totalLength}`}</span>
        </div>
        <AnswerList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            answerState={props.answerState}
        />
        <div className='created'>
            Created by <span className='author-name'>{props.authorName}</span>
        </div>
      </div> 
    </div>
    
)

export default QuestionBlock;