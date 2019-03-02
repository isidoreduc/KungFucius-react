import React, { Component } from 'react';
import { BreadcrumbItem, Breadcrumb, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                telnum: false,
                email: false,
                message: false
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleSubmit = (event) => {
        alert("You submitted: " + JSON.stringify(this.state));
        event.preventDefault();
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleBlur = (field) => () => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate = (firstname, lastname, telnum, email, message) => {
        const errors = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            message: ''
        };

        this.state.touched.firstname && firstname.length < 3 ?
            errors.firstname = "Field should contain more than 3 characters" : errors.firstname = null;
        this.state.touched.firstname && firstname.length > 16 ?
            errors.firstname = "Field should contain less than 16 characters" : errors.firstname = null;

        this.state.touched.lastname && lastname.length < 3 ?
            errors.lastname = "Field should contain more than 3 characters" : errors.lastname = null;
        this.state.touched.lastname && lastname.length > 16 ?
            errors.lastname = "Field should contain less than 16 characters" : errors.lastname = null;

        const reg = /^\d+$/;
        this.state.touched.telnum && !reg.test(telnum) ?
            errors.telnum = "Field should contain only numbers" : errors.telnum = null;

        this.state.touched.email && email.split('').filter(c => c === '@').length !== 1 ?
            errors.email = "Not a valid email" : errors.email = null;

        this.state.touched.message && lastname.message < 3 ?
            errors.message = "Field should contain more than 3 characters" : errors.message = null;
        this.state.touched.message && message.length > 500 ?
            errors.message = "Field should contain less than 16 characters" : errors.message = null;

        return errors;
    }

    render() {
        const errs = this.validate(this.state.firstname,
            this.state.lastname,
            this.state.telnum,
            this.state.email,
            this.state.message);
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href="tel:+85212345678"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className='row row-content'>
                    <div className='col-12'>
                        <h3>Send us your thoughts:</h3>
                    </div>
                    <div className='col-12 col-md-9'>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor='firstname' md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input text='text' id='firstname' name='firstname' placeholder='First Name'
                                        value={this.state.firstname} 
                                        valid={errs.firstname === null}
                                        invalid={errs.firstname !== null}
                                        onChange={this.handleInputChange}  
                                        onBlur={this.handleBlur('firstname')}/>
                                    <FormFeedback>{errs.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='lastname' md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input text='text' id='lastname' name='lastname' placeholder='Last Name'
                                        value={this.state.lastname} 
                                        valid={errs.lastname === null}
                                        invalid={errs.lastname !== null}
                                        onChange={this.handleInputChange} 
                                        onBlur={this.handleBlur('lastname')}/>
                                    <FormFeedback>{errs.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='telnum' md={2}>Tel. number</Label>
                                <Col md={10}>
                                    <Input text='tel' id='telnum' name='telnum' placeholder='Tel. number'
                                        value={this.state.telnum} 
                                        valid={errs.telnum === null}
                                        invalid={errs.telnum !== null}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('telnum')} />
                                    <FormFeedback>{errs.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='email' md={2}>Email</Label>
                                <Col md={10}>
                                    <Input text='text' id='email' name='email' placeholder='Email'
                                        value={this.state.email} 
                                        valid={errs.email === null}
                                        invalid={errs.email !== null}
                                        onChange={this.handleInputChange} 
                                        onBlur={this.handleBlur('email')}/>
                                    <FormFeedback>{errs.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 6, offset: 2 }}>
                                    <FormGroup check>
                                        <Input type='checkbox' name='agree' checked={this.state.agree} onChange={this.handleInputChange} />
                                        {' '} <strong>May we contact you?</strong>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <FormGroup dropdown>
                                        <Input type='select' name='contactType' value={this.state.contactType} onChange={this.handleInputChange}>
                                            <option>Telephone</option>
                                            <option>Email</option>
                                            <option>Messenger</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='message' md={2}>Your feedback</Label>
                                <Col md={10}>
                                    <Input type='textarea' id='message' name='message' placeholder='Type here please, then press send'
                                        rows='10' value={this.state.message} 
                                        valid={errs.message === null}
                                        invalid={errs.message !== null}
                                        onChange={this.handleInputChange} 
                                        onBlur={this.handleBlur('message')}/>
                                    <FormFeedback>{errs.message}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type='submit' color='primary'>Send</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;