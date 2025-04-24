import React, { Component } from 'react'
import UserFunctions from "../../../functions/UserFunctions";
import { Button, FormControl, Input, Alert, Text, Link, HStack, VStack, AlertIcon } from '@chakra-ui/react'
import Password from '../Password'
import "./SignUp.css";
import { useNavigate } from 'react-router-dom';


class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            username: '',
            confirmPassword: '',
            view: 'hidden',
            errors: this.getEmptyErrorObject()
        }

        this.functions = new UserFunctions()

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    getEmptyErrorObject = () => ({
        email: '',
        password: '',
        username: '',
        confirmPassword: ''
    })


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    setErrorField = (errors, newError) => {
        return { ...errors, ...newError };
    }

    validateUser() {
        let isValid = true;
        let errors = this.getEmptyErrorObject();
        console.log("email: ", this.state.email);
        if (!this.validateEmail(this.state.email)) {
            errors = this.setErrorField(errors, { email: "Email invalid." });
            isValid = false;
        }
        console.log("pass: ", this.state.password);

        if (this.state.password.length < 8 || this.state.password.trim() === "") {
            errors = this.setErrorField(errors, { password: "Parola trebuie sa contina cel putin 8 caractere." });
            isValid = false;
        }
        console.log("username: ", this.state.username);

        if (this.state.username.trim() === "") {
            errors = this.setErrorField(errors, { username: "Nume de utilizator invalid!" });
            isValid = false;
        }

        console.log("confirm pass: ", this.state.confirmPassword);

        if (this.state.confirmPassword !== this.state.password) {
            errors = this.setErrorField(errors, { confirmPassword: "Parolele nu coincid!" })
            isValid = false;
        }


        console.log(errors);

        this.setState({ errors });

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault()

        if (this.validateUser()) {
            const newUser = {
                email: this.state.email,
                password: this.state.password,
                username: this.state.username
            }

            console.log(newUser);
            try {
                // todo: fix this in case register fails
                this.functions.register(newUser)
                this.props.navigate('/');

            } catch (err) {
                console.warn(err)
            }

        }
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
            <div className="wrapper">
                <div className="form-wrapper">
                    <form onSubmit={this.onSubmit}>
                        <VStack spacing={5}>

                            <Text fontSize='2xl'>Înregistrare</Text>

                            <HStack>
                                <FormControl >
                                    <Input id='username' placeholder='Nume de utilizator' onChange={e => this.setState({ username: e.target.value })} value={this.state.username} />
                                    {this.renderError(this.state.errors.username)}
                                </FormControl>
                                <FormControl>
                                    <Input id='email' placeholder='Email' onChange={e => this.setState({ email: e.target.value })} value={this.state.email} />
                                    {this.renderError(this.state.errors.email)}

                                </FormControl>
                            </HStack>


                            <Password placeholder={"Parola"} onChange={e => this.setState({ password: e.target.value })} value={this.state.password} />
                            {this.renderError(this.state.errors.password)}

                            <Password placeholder={"Confirmare parola"} onChange={e => this.setState({ confirmPassword: e.target.value })} value={this.state.confirmPassword} />
                            {this.renderError(this.state.errors.confirmPassword)}


                            <Link to="/">
                                <Button type="submit" background='#53589F' color={'white'} _hover={{ bg: '#7A7CC6' }} onSubmit={this.onSubmit}>
                                    Înregistrează-te!
                                </Button>
                            </Link>

                            <div className='register-wrapper'>
                                Ai deja un cont? Loghează-te <a href='/'>aici</a>!
                            </div>
                        </VStack>

                    </form>

                </div>
            </div>

        )
    }
}

const RegisterWrapper = (props) => {
    const navigate = useNavigate();
    return <Register {...props} navigate={navigate} />
}


export default RegisterWrapper