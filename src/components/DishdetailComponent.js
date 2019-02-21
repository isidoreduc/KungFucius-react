import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText } from 'reactstrap';

class DishDetail extends Component {
    

    renderDish(dish) {
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

    renderComments(comments) {
        if (comments != null)
            return (
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map = (c => {
                            return (
                                <li key={c.id}>
                                    <p>{c.comment}</p>
                                    <p>{c.author}</p>
                                </li>
                            );
                        })}

                    </ul>
                </div>
            );
        else
            return (<div></div>);
    }

    render() {
        if (this.props.dish != null)
            return (
                <div className='container'>
                    <div className='row'>
                        {this.renderDish(this.props.dish)}
                        {this.renderComments(this.props.dish.comment)}
                    </div>
                </div>
            );
        else
            return (<div></div>);
    }
}

export default DishDetail;