import React, {Component} from 'react';
import axios from 'axios';
import './Form.css';

const checkEmail = RegExp(`^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$`);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: null,
            password: null,
            passwordConfirm: null, 
            openForm: false,
            userCreated: false, 
            statusShow: false,
            errors: {
                name: '',
                email: '',
                password: '',
                passwordConfirm: ''
            }
        }
    }
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'name':
                errors.name =
                    (value.length < 5)
                        ? 'Your name must be at least 5 characters'
                        : '';
                break;
            case 'email':
                errors.email =
                    checkEmail.test(value)
                        ? ''
                        : 'Email is not valid';
                break;
            case 'password':
                errors.password =
                    (value.length < 6)
                        ? 'Password must be at least 6 characters'
                        : '';
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    }

    handleSubmit = event => {
        let info = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.passwordConfirm
        }
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            this.setState({
                openForm: !this.state.openForm
            });
        } else {
            this.setState({
                openForm: this.state.openForm
            });
        }

        axios
            .post('/api/users', info)
            .then(response => {
                this.setState({statusShow: true })
                if (response.statusText === 'OK') {
                    this.props.handleLogin(response.data);
                    this.redirect();
                    this.setState({
                        userCreated: true,
                        name: '',
                        email: '',
                        password: '',
                        passwordConfirm: '' })
                    console.log('done');
                }
            })
    }

    redirect = () => {
        this.props.history.push('/')
    }

    render() {
        const { errors } = this.state;
        return(
            <div className='form-block'>
                <div className='page-title'>Sign up</div>
                <div className={`page-block status-message ${this.state.statusShow ? 'show-message' : ''}`}>
                    {this.state.userCreated ? 
                        <div className='success-message'>User was succesfully created.</div> 
                        : <div className='fail-message'>User wasn't created. Try again.</div>}
                </div>
                <div className='user-form page-block'>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            User name:
                            <div className='input-field'>
                                <input type='text' name="name" value={this.state.name} placeholder='N a m e' onChange = {this.handleChange} />
                                {errors.name.length > 0 && <div className='error'>{errors.name}</div>}
                            </div> 
                        </label>
                        <label>
                            User email:
                            <div className='input-field'>
                                <input noValidate type='email' value={this.state.email} name="email" placeholder='E m a i l' onChange = {this.handleChange} />
                                {errors.email.length > 0 && <div className='error'>{errors.email}</div>}
                            </div>
                        </label>
                        <label>
                            User password:
                            <div className='input-field'>
                                <input type='password' name="password" value={this.state.password} placeholder='P a s s w o r d' onChange = {this.handleChange} />
                                {errors.password.length > 0 && <div className='error'>{errors.password}</div>}
                            </div>
                        </label>
                        <label>
                            Password confirmation:
                            <div className='input-field'>
                                <input type='password' name="passwordConfirm" value={this.state.passwordConfirm} placeholder='P a s s w o r d   c o n f i r m a t i o n' onChange = {this.handleChange} />
                                {errors.passwordConfirm.length > 0 && <div className='error'>{errors.passwordConfirm}</div>}
                            </div>
                        </label>
                        <div>
                            <input className='button-style' type='submit' value='Sign up'/>
                        </div>
                    </form>
                </div> 
            </div>
        )
    }
}

export default SignUpForm;