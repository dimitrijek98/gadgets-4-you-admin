import React, {Component} from 'react';
import SideNav from "./SideNav";
import Forms from "./Forms";
import AuthService from "../../services/AuthService";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.AuthService = new AuthService();
        this.state = {
            selected: '1',
            userType: ''
        }
    }

    componentDidMount() {
        const userType = this.AuthService.getUserType();
        console.log(userType);
        this.setState({userType});
    }

    navClick = (e) => {
        if (e.target.value === '3') {
            localStorage.removeItem('user');
            this.props.history.push('/');
        }
        this.setState({selected: e.target.value})
    };

    render() {
        return (
            <div className='container-fluid dashboard'>
                {this.state.userType &&
                <div className='row'>
                    <SideNav navClick={this.navClick} userType={this.state.userType} selected={this.state.selected}/>
                    <Forms userType={this.state.userType} selected={this.state.selected}/>
                </div>}
            </div>
        );
    }
}

export default Dashboard;