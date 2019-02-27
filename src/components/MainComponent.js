import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DISHES } from '../shared/dishes';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/comments';


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

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
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
    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Route exact path='/contact' component={Contact}/>
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>

    );
  }
}

export default Main;