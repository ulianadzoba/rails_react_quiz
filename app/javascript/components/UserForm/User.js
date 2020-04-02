import React from 'react';
import './User.css';


const User = props => {
    console.log(props);
    
    return (
    <>
        <div className='page-title'>User list</div>
        <div className='page-block'>
            
            <div className='table-header'>
                <div className='user-index'>№</div> 
                <div className='user-name'>Name</div> 
                <div className='user-email'>Email</div>  
            </div>
             {props.data.map((user, index) => {
                 return (
                     <div className='user-info'>
                        <div className='user-index'>{(props.currentPage-1)*10+(index+1)}</div> 
                        <div className='user-name'>{user.name}</div> 
                        <div className='user-email'>{user.email}</div>    
                     </div>    
                 )
             })}             
        </div>
    </>

    )
}

export default User;