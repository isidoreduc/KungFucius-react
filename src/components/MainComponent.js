import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
    comments: state.comments
  }
}

class Main extends Component {

  constructor(props) {
    super(props);
    
  }

  

  render() {
    const HomePage = () => {
      return (
        <Home 
          dish = {this.props.dishes.filter(d => d.featured)[0]}
          promotion = {this.props.promotions.filter(P => P.featured)[0]}
          leader = {this.props.leaders.filter(l => l.featured)[0]}
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contact' component={Contact}/>
          <Route exact path='/about' component={About}/>
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>

    );
  }
}

export default withRouter(connect(mapStateToProps) (Main)) ;