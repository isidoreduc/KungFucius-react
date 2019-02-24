import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText } from 'reactstrap';




    const RenderDish = ({dish}) => { // just extracting property dish from props and use it as parameter
        return (
            <div className='col-md-5 m-1'>
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

    const RenderComments = ({comments}) => { // just extracting property comments from props and use it as parameter
        if (comments != null)
            return (
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((c) => {
                            return (
                                <div class='container'>
                                    <li key={c.id}>
                                        <p>{c.comment}</p>
                                        <p>-- {c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(c.date)))}</p>
                                    </li>
                                </div>
                            );
                        })}

                    </ul>
                </div>
            );
        else
            return (<div></div>);
    }

    const DishDetail = (props) => {
        if (props.dish != null)
            return (
                <div className='container'>
                    <div className='row'>
                        <RenderDish dish={props.dish}/>
                        <RenderComments comments={props.dish.comments}/>
                    </div>
                </div>
            );
        else
            return (<div></div>);
    }


export default DishDetail;