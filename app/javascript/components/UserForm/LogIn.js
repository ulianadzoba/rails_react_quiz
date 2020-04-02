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
        console.log(props);
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null,
            passwordConfirm: null, 
            openForm: false,
            errors: {
                name: '',
                email: '',
                password: '',
                passwordConfirm: ''
            }
        }
    }

    //
    componentWillMount() {
        return this.props.loggedInStatus ? this.redirect() : null
    }
    //

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        
        switch (name) {
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

    handleSubmit = (event) => {
        let info = {
            email: this.state.email,
            password: this.state.password,
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
        console.log(info);
        axios
            .post('/api/login', info)
            .then(response => {
                console.log(response);
                if (response.data.logged_in) {
                    this.props.handleLogin(response.data)
                    this.redirect()
                } 
            })

        event.preventDefault();
    }

    redirect = () => {
        this.props.history.push('/')
    }

    render() {
        const { errors } = this.state;
        return(
            <div className='form-block'>
                <div className='page-title'>Log in</div>
                <div className='user-form page-block'>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            User email:
                            <div className='input-field'>
                                <input type='email' name="email" placeholder='E m a i l' onChange = {this.handleChange} />
                                {errors.email.length > 0 && <div className='error'>{errors.email}</div>}
                            </div>
                        </label>
                        <label>
                            User password:
                            <div className='input-field'>
                                <input type='password' name="password" placeholder='P a s s w o r d' onChange = {this.handleChange} />
                                {errors.password.length > 0 && <div className='error'>{errors.password}</div>}
                            </div>
                        </label>
                        <div>
                            <input className='button-style' type='submit' value='Log in'/>
                        </div>
                    </form>
                </div>
                
            </div>
        )
    }
}

export default SignUpForm;