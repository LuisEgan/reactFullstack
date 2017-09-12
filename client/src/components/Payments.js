import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        // debugger;
        return (
            <StripeCheckout
                name = "Emaily Credits"
                description = "$5 for 5 Emaily Credits"
                amount = {500 /* cents */}
                token = {token => this.props.handleToken(token) /* token recieved when payment is processed*/}
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </ StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);