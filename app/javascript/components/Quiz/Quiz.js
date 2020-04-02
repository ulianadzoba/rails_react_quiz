import React, { Component } from 'react';
import './Quiz.css';
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import FinishedLayout from '../FinishedLayout/FinishedLayout';
import axios from 'axios';
import Loader from '../Loader/Loader';

class Quiz extends Component {
    state = {
        finished: false,
        currentQuestion: 0,
        answerState: null,
        result: 0,
        questions: [],
        loading: true

    }

    componentDidMount() {
        axios
          .get('/api/questions')
          .then(response => {
              console.log(response);
            this.setState({ 
                questions: response.data.questions,
                loading: false 
            });
          })
      }

    onAnswerClick = (answerId) => {
        const activeQuestion = this.state.questions[this.state.currentQuestion];

        if (activeQuestion.correctAnswer === answerId) {
            this.setState({
                answerState: { [answerId]: 'true' },
                result: this.state.result + 1
            })
        } else {
            this.setState({
                answerState: { [answerId]: 'false' }
            })
        }

        const timeout = window.setTimeout(() => {
            if (this.isGameFinished()) {
                this.setState({
                    finished: !this.state.finished
                })
            }
            else {
                this.setState({
                    currentQuestion: this.state.currentQuestion + 1,
                    answerState: null
                })
            }
            window.clearTimeout(timeout)
        }, 1300)


    }

    isGameFinished() {
        return this.state.currentQuestion + 1 === this.state.questions.length
    }

    onRetry = () => {
        this.setState({
            finished: false,
            currentQuestion: 0,
            answerState: null,
            result: 0,
        })
    }
    render() {
        return (
            <div className='quiz'>
                <div className='quiz-title'>Math Quiz</div>
                {this.state.loading 
                    ? 
                        <Loader/>
                    : this.state.finished ?
                    <FinishedLayout
                        result={this.state.result}
                        questionsNumber={this.state.questions.length}
                        onRetry={this.onRetry} />

                    : <QuestionBlock
                        title={this.state.questions[this.state.currentQuestion].title}
                        authorName = {this.state.questions[this.state.currentQuestion].user_name}
                        id={this.state.currentQuestion + 1}
                        answers={this.state.questions[this.state.currentQuestion].answers}
                        totalLength={this.state.questions.length}
                        onAnswerClick={this.onAnswerClick}
                        currentQuestion={this.state.currentQuestion + 1}
                        answerState={this.state.answerState}
                    />
                }
            </div>
        );
    }
}

export default Quiz;