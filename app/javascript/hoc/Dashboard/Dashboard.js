import React, { Component } from 'react';
import './Dashboard.css';
import MenuButton from '../../components/Navigation/MenuButton/MenuButton';
import Menu from '../../components/Navigation/Menu/Menu';
import {Route} from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        }
    }

    menuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    closeMenu = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        return (
            <section className='dashboard'>
                <MenuButton
                    isOpen={this.state.menu}
                    openMenu={this.menuHandler} />
                <Route render={props => (
                    <Menu
                        {...props}
                        isOpen={this.state.menu}
                        closeMenu={this.closeMenu} 
                        handleLogout={this.props.handleLogout} 
                        loggedInStatus={this.props.loggedInStatus}/>
                )} />
                
                {this.props.children}
            </section>
        );
    }
}

export default Dashboard;