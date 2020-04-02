import React, { Component } from 'react';
import './Menu.css';
import { NavLink} from 'react-router-dom';
import Backdrop from '../../Backdrop/Backdrop';
import axios from 'axios';

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        axios.delete('api/logout', {withCredentials: true})
        .then(response => {
          this.props.handleLogout();
          this.props.history.push('/');
        })
        .catch(error => console.log(error));
        this.props.closeMenu();
    }

    render() {
        const classes = ['quiz-menu'];
        if (!this.props.isOpen) {
            classes.push('hide-menu');
        };

        return (
            <>
                <div className={classes.join(' ')}>
                    <ul className='menu-list'>
                        <li>
                            <NavLink to='/' exact={true} activeClassName='active - link' onClick={this.props.closeMenu}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/questions' exact={true} activeClassName='active - link' onClick={this.props.closeMenu}>Get started</NavLink>
                        </li>   
                        {this.props.loggedInStatus ? 
                            <>
                                <li>
                                    <NavLink to='/questions/new' exact={true} activeClassName='active - link' onClick={this.props.closeMenu}>Create question</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/users' exact={true} activeClassName='active - link' onClick={this.props.closeMenu}>Show all users</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/logout' activeClassName='active - link' onClick={this.handleClick}>Log Out</NavLink>
                                </li>
                            </>
                            :
                            <li>
                                <NavLink to='/login' exact={true} activeClassName='active - link' onClick={this.props.closeMenu}>Log in</NavLink>
                            </li>
                        }   
                    </ul>
                </div>
                {this.props.isOpen ? <Backdrop onClose={this.props.closeMenu} /> : null}
            </>
        );
    }
}

export default Menu;