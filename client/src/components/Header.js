import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null:
                return "";
            case false:
                return (
                    <li><a href="/auth/google">Log In</a></li>
                );
            default: //if user is logged in and auth is an object
                return [
                    <li key="1"><Payments /></li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <Link
                            to={this.props.auth ? '/surveys' : '/'}
                            className="left brand-logo">
                                Emaily
                        </Link>
                        <ul className="right">
                            {this.renderContent()}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

// function mapStateToProps ( state ) {
//     return { auth: state.auth };
// }
//Which is the same as
function mapStateToProps ({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(Header);