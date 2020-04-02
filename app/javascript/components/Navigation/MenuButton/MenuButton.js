import React from 'react';
import './MenuButton.css';

const MenuButton = props => {
    const classes = ['menu-button'];

    if (props.isOpen) {
        classes.push('fa fa-times')
        classes.push('close')
    } else {
        classes.push('fa fa-bars')
        classes.push('open')
    }
    return (
        <i className={classes.join(' ')}
        onClick={props.openMenu} />
        
        // <h1 className={classes.join(' ')} onClick={props.openMenu}>X</h1>
            
    )
}

export default MenuButton;