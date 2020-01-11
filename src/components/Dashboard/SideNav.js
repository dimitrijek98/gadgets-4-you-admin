import React, {Component} from 'react';

class SideNav extends Component {

    render() {
        return (
            <div className='col-lg-2 side-nav'>
                <div className='container-fluid side-nav-container'>
                    <div className='row'>
                        <div className='col-12'>
                            <button onClick={this.props.navClick} value={1}
                                    className={this.props.selected === '1' ? 'btn btn-block side-nav-link-active' : 'btn side-nav-link'}>Nove
                                Sume
                            </button>
                        </div>
                        <div className='col-12'>
                            <button onClick={this.props.navClick} value={2}
                                    className={this.props.selected === '2' ? 'btn btn-block side-nav-link-active' : 'btn side-nav-link'}>Smanjenje
                                Suma
                            </button>
                        </div>
                        <div className='col-12'>
                            <button onClick={this.props.navClick} value={3}
                                    className={this.props.selected === '3' ? 'btn btn-block side-nav-link-active' : 'btn side-nav-link'}>Sume
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideNav;