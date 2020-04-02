import React, {Component} from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import User from './User';
import {Pagination} from 'semantic-ui-react';

class ShowUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('/api/users')
        .then(response => {
            console.log(response);
            this.initialState(response.data)
        })
    }

    initialState = (response) => {
        this.setState({ 
            users: response,
            loading: false 
        });
        console.log(response)
    }

      handlePage = (e, {activePage}) => {
        let gotopage = {activePage};
        let pagenum = gotopage.activePage;
        let pagestring = pagenum.toString();
        this.setState({
            loading: true,

        })
        const url = '/api/users/?page=' + pagestring;
        axios.get(url).then(response => { this.initialState(response.data)})
      }

    render() {
        return (
            <>
                {this.props.loggedInStatus ? 
                    <div>
                        {this.state.loading ? 
                            <Loader/> : 
                            <>
                                <div>
                                    <User data={this.state.users.users}
                                        currentPage={this.state.users.page}/>
                                </div>
                                <Pagination onPageChange={this.handlePage} size='mini' 
                                    defaultActivePage={this.state.users.page}
                                    totalPages={this.state.users.pages}
                                    boundaryRange={0}
                                    ellipsisItem={null}
                                    firstItem={null}
                                    lastItem={null}
                                    siblingRange={1}
                                                    />
                            </>
                            }

                    </div>
                    :
                    <div className='page-title access-denied'>Access denied</div>
                }
            </>
        )
    }

}

export default ShowUsers;