import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

const RenderMenuItem = ({ dish, onClick }) => { // dish, onClick are properties of object props
    return (
        <Card >
            <CardImg width='100%' src={dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

const Menu = (props) => {
    const menu = props.dishes.map(dish => {
        return (
            <div key={dish.id} className='col-12 col-md-2 m-1'>
                <RenderMenuItem dish={dish} onClick={props.onClick} />
            </div>
        );
    });
    return (
        <div className='container' >
            <div className='row'>
                {menu}
            </div>
        </div>
    );
}


export default Menu;