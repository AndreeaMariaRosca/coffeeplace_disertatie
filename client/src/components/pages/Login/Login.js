import React, { Component } from 'react'
import UserFunctions from "../../../functions/UserFunctions";
import { Button, FormControl, Input, Alert, Text, Link, AlertIcon } from '@chakra-ui/react'
import Password from '../Password'
import "./Login.css";
import { storeUserDetails } from '../../../utils/storage';
import { useNavigate } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: this.getEmptyErrorObject()
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.functions = new UserFunctions();

        this.handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        this.functions.emitter.addListener("LOGIN_UNSUCCESSFUL", () => {
            this.setState({ errors: this.functions.error });
            return false;
        });
        this.functions.emitter.addListener("LOGIN_SUCCESSFUL", () => {
            return true;
        });
    }

    getEmptyErrorObject = () => ({
        email: '',
        password: ''
    })

    setErrorField = (errors, newError) => {
        return {...errors, ...newError};
    }

    onSubmit(e) {
        e.preventDefault();
        const isValid = this.validateUser();

        if (!isValid) {
            return;
        }
        
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        this.functions.login(user)
            .then(loggedInUser => {
                storeUserDetails(loggedInUser);
                this.props.navigate('coffees')
        }).catch(() => {
            const errors = this.setErrorField(this.state.errors, { password: 'Email-ul sau parola este gresita!' })
            this.setState({ errors })
        })

    };

    validateUser() {
        let errors = this.getEmptyErrorObject();
        let isValid = true;
        if (!this.state.email) {
            errors = this.setErrorField(errors, { email: 'Introduceti un email.'})
            isValid = false;
        }
        if (!this.state.password) {
            errors = this.setErrorField(errors, { password: 'Introduceti o parola.'})
            isValid = false;
        }

        this.setState({ errors });
        return isValid;
    }

    renderError = (error) => (
        error && (
            <Alert status='error'>
                <AlertIcon />
                {error}
            </Alert>
        )
)

    render() {
        return (
            <div className="wrapper" >
                <div className="form-wrapper" onSubmit={this.onSubmit}>
                    <form >
                        <Text fontSize='2xl'>Logare</Text>
                        <br></br>
                        <FormControl>
                            <Input id='email' placeholder='Email' value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                            { this.renderError(this.state.errors.email) }
                        </FormControl>
                        <br></br>

                        <Password placeholder={"Parola"} value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                        { this.renderError(this.state.errors.password) }

                        <br></br>

                        <Link to="/coffees">
                            <Button type="submit" background='#53589F' color={'white'} _hover={{ bg: '#7A7CC6' }} onSubmit={this.onSubmit}>Logare</Button>
                        </Link>

                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>

                        <div className='register-wrapper'>
                            Nu ai un cont? Înregistrează-te <a href='/signup'>aici</a>!
                        </div>
                    </form>

                </div>
            </div>

        )
    }
}

const LoginWrapper = (props) => {
    const navigate = useNavigate();
    return <Login {...props} navigate={navigate}/> 
}

export default LoginWrapper