import React, {Component} from 'react';
import Input from './Input';
import {createControl, validate, validateForm} from './FormValidation';
import './QuestionCreator.css';
import axios from 'axios';

function createOptionControl(number) {
  return createControl({
    label: `Option ${number}`,
    errorMessage: 'Option value can not be empty',
    id: number
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Input question title:',
      errorMessage: 'Question title can not be empty'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

class QuestionCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdQuestion: {}, 
      isFormValid: false,
      correctAnswerId: 1,
      formControls: createFormControls()
    }
  }

  addQuestionHandler = async event => {
    event.preventDefault();
    const {question, option1, option2, option3, option4} = this.state.formControls;
    
    const questionItem = {
      question: question.value,
      correctAnswerId: this.state.correctAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    const createdQuestion = questionItem;
    console.log(createdQuestion);

    this.setState({ createdQuestion }) ;

    try {
      await 
      axios.post('/api/questions', createdQuestion);
      this.setState({
        createdQuestion: {},
        isFormValid: false,
        correctAnswerId: 1,
        formControls: createFormControls()
      })
    } catch (e) {
      console.log(e)
    } 
  }

  inputHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  controlInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.inputHandler(event.target.value, controlName)}
          />
          { index === 0 ? <hr /> : null }
        </>
      )
    })
  }

  handleOptionChange = event => {
    console.log(event.target.value);
    this.setState({
      correctAnswerId: +event.target.value
      
    })
  }

  render() {
    const select = <div className='select-block'>
      <div className='select-title'>
        Select correct option
      </div>
      <div onChange={this.selectHandler} className='select-radio'>
        <div className="radio">
          <label>
            <input type="radio" value="1" checked={this.state.correctAnswerId === 1} 
                   onChange={this.handleOptionChange}/>
            <span>1</span>
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="2" checked={this.state.correctAnswerId === 2} 
                   onChange={this.handleOptionChange}/>
            <span>2</span>
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="3" checked={this.state.correctAnswerId === 3} 
                   onChange={this.handleOptionChange}/>
            <span>3</span>
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="4"checked={this.state.correctAnswerId === 4} 
                   onChange={this.handleOptionChange} />
            <span>4</span>
          </label>
        </div>
      </div>
    </div>

    return (
      <div className='create-block'>
        {this.props.loggedInStatus ? 
          <>
            <div className='page-title'>Create question</div>
            <div className='page-block'>          
              <form onSubmit={this.submitHandler}>
                { this.controlInputs() }
                { select }
                <button className='button-style' disabled={!this.state.isFormValid} onClick={this.addQuestionHandler}>Create Question</button>
              </form>
            </div>
          </>
        :
        <div className='page-title access-denied'>Access denied</div>
      }

        
      </div>
    )
  }
}

export default QuestionCreator;