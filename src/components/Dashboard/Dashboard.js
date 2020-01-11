import React, {Component} from 'react';
import SideNav from "./SideNav";
import Forms from "./Forms";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '1',
        }
    }

    navClick = (e) => {
        this.setState({selected: e.target.value})
    };

    render() {
        return (
            <div className='container-fluid dashboard'>
                <div className='row'>
                    <SideNav navClick={this.navClick} selected={this.state.selected}/>
                    <Forms selected={this.state.selected}/>
                </div>
            </div>
        );
    }
}

export default Dashboard;