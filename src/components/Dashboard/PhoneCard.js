import React, {Component} from 'react';

class PhoneCard extends Component {

    render() {
        return (
            this.props.phone &&
                    <div className='phone-card'>
                <div>
                    <h6>{`Brand: ${this.props.phone.brand}`}</h6>
                    <h6>{`Model: ${this.props.phone.model}`}</h6>
                </div>
                <button className='btn btn-outline-danger' onClick={() => this.props.deletePhone(this.props.phone)}>Delete</button>
            </div>
        );
    }
}

export default PhoneCard;