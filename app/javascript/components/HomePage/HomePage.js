import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = props => {
    return (
        <div className='home-page'>
            <div className='home-page-title'>Welcome to Math Quiz</div>
            <div className='home-buttons'>
                <div className='home-button'>
                    <Link to="/questions">
                        <button>Get started</button>
                    </Link>
                </div>
                <div className='home-button'>
                    <Link to="/signup">
                        <button>Sign up</button>
                    </Link>
                </div>     
            </div>
        </div>

    )
}

export default HomePage;