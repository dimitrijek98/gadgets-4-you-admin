import React, {Component} from 'react';

class ProductCard extends Component {
    render() {
        return (
            this.props.product &&
            <div className='phone-card'>
                <div>
                    <h6>{`Name: ${this.props.product.name}`}</h6>
                    <h6>{`Price: ${this.props.product.price}`}</h6>
                </div>
                <button className='btn btn-outline-danger' onClick={() => this.props.deleteProduct(this.props.product)}>Delete</button>
            </div>
        );
    }
}

export default ProductCard;