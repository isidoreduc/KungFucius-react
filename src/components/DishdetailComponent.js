import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem, Label, Col, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from 'react-redux-form'


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const RenderDish = ({ dish }) => { // just extracting property dish from props and use it as parameter
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle >{dish.name}</CardTitle>
                    <CardText> {dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );

}

const RenderComments = ({ comments }) => { // just extracting property comments from props and use it as parameter
    if (comments != null)
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((c) => {
                        return (
                            <div >
                                <li key={c.id}>
                                    <p>{c.comment}</p>
                                    <p>-- {c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(c.date)))}</p>
                                </li>
                            </div>
                        );
                    })}
                    <CommentForm />
                </ul>


            </div>
        );
    else
        return (<div></div>);
}

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

    }

    handleSubmit = (values) => {
        alert("You submitted: " + JSON.stringify(values));
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
            <div>
                <Button className='btn btn-light btn-github' outline onClick={this.toggleModal}> Add a comment</Button>

                <Modal  isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Your comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Label md={{ size: 10, offset: 1 }} htmlFor="rating" >Rating</Label>
                            <Row className="form-group">
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Control.select model=".rating" name="rating" id='rating'
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Label md={{ size: 10, offset: 1 }} htmlFor="name" >Name</Label>
                            <Row className="form-group">
                                
                                <Col md={{ size: 10, offset: 1 }}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(25)
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: '***Required ',
                                            minLength: '***Must be greater than 2 characters ',
                                            maxLength: '***Must be 25 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Label md={{ size: 10, offset: 1 }} htmlFor="message">Comment</Label>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 1 }}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="5"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(250)
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".message"
                                            show="touched"
                                            messages={{
                                                required: '***Required ',
                                                minLength: '***Must be greater than 2 characters ',
                                                maxLength: '***Must be 250 characters or less'
                                            }}
                                        />
                                </Col>
                            </Row>
                            <Button md={{ offset: 1 }}className='btn btn-light btn-github' outline type='submit'> Submit </Button>
                        </ LocalForm>

                        {/* <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form> */}
                    </ModalBody>
                </Modal>
            </div>


        );
    }
}

const DishDetail = (props) => {
    if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />

                </div>
            </div>
        );
    else
        return (<div></div>);
}




export default DishDetail;
