import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { COMMENTS } from '../shared/comments';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      comments: COMMENTS
    };
  }

  

  render() {
    const HomePage = () => {
      return (
        <Home 
          dish = {this.state.dishes.filter(d => d.featured)[0]}
          promotion = {this.state.promotions.filter(P => P.featured)[0]}
          leader = {this.state.leaders.filter(l => l.featured)[0]}
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contact' component={Contact}/>
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>

    );
  }
}

export default Main;