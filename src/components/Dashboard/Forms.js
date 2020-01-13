import React, {Component} from 'react';
import PhoneService from "../../services/PhoneService";
import PhoneCard from "./PhoneCard";
import ProductService from "../../services/ProductService";
import AuthService from "../../services/AuthService";
import ProductCard from "./ProductCard";

class Forms extends Component {
    constructor(props) {
        super(props);
        this.PhoneService = new PhoneService();
        this.ProductService = new ProductService();
        this.AuthService = new AuthService();
        this.state = {
            allPorts: [],
            charging: [],
            audio: [],
            phones: [],
            products: [],
            product: {
                seller: '',
                name: '',
                price: '',
                connector: '',
                image: '',
            },
            phone: {
                admin: 'admin@admin.com',
                brand: '',
                model: '',
                charging: '',
                audio: '',
                bluetooth: true
            }
        }
    }

    componentDidMount() {
        const userEmail = this.AuthService.getUserEmail();
        if (this.props.userType === 'admin') {
            this.PhoneService.getAudioPorts()
                .then(res => {
                    this.setState({audio: res.data})
                })
                .catch(err => {
                    console.log(err);
                });
            this.PhoneService.getChargingPorts()
                .then(res => {
                    this.setState({charging: res.data})
                })
                .catch(err => {
                    console.log(err);
                });
            this.PhoneService.getPhoneModels()
                .then(res => {
                    this.setState({phones: res.data})
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            const seller = this.AuthService.getUserName();
            console.log(seller);
            this.setState({product: {...this.state.product, seller}});
            this.ProductService.getSellersProducts(userEmail)
                .then(res => {
                    this.setState({products: res.data})
                })
                .catch(err => {
                    console.log(err);
                });
            this.PhoneService.getAllPorts()
                .then(res => {
                    this.setState({allPorts: res.data})
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    deletePhone = (phone) => {
        this.PhoneService.deletePhone(phone)
            .then(res => {
                let phoneList = this.state.phones.filter(p => p !== phone);
                this.setState({phones: phoneList});
            })
            .catch(err => {
                console.log(err);
            })

    };

    deleteProduct = (product) => {
        console.log(product);
        this.ProductService.deleteProduct(product)
            .then(res => {
                let productList = this.state.products.filter(p => p !== product);
                this.setState({products: productList});
            })
            .catch(err => {
                console.log(err);
            })

    };

    onChange = (e) => {
        const phone = this.state.phone;
        phone[e.target.name] = e.target.value;
        this.setState({phone: phone})
    };

    onProductChange = (e) => {
        const product = this.state.product;
        if (e.target.name === 'image') {
            this.setState({image: e.target.files[0], product:{...product, image: e.target.files[0].name}})
        } else {
            product[e.target.name] = e.target.value;
            this.setState({product: product})

        }
    };


    addPhone = (e) => {
        e.preventDefault();
        const {phone} = this.state;
        this.PhoneService.addPhone(phone)
            .then(res => {
                this.setState({phones: [...this.state.phones, res.data]})
            })
    };

    addProduct = (e) => {
        e.preventDefault();
        const {product} = this.state;
        let data = new FormData();
        data.append('file', this.state.image);
        this.ProductService.addProduct(product)
            .then(res => {
                this.setState({products: [...this.state.products, res.data]});
                this.ProductService.uploadProductImage(data)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        if (this.props.userType === 'admin')
            return (
                this.props.selected === '1' ?
                    <div className='col-lg-10 forms'>
                        <div className='header'>
                            <h2>Add New Phone</h2>
                        </div>

                        {this.state.charging.length > 0 && this.state.audio.length > 0 ?
                            <form>
                                <div className="form-group ">
                                    <label htmlFor="inputEmail4">Brand</label>
                                    <input type="text" onChange={this.onChange} name={'brand'} className="form-control"
                                           id="inputEmail4"/>
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="inputPassword4">Model name</label>
                                    <input type="text" onChange={this.onChange} name={'model'} className="form-control"
                                           id="inputPassword4"/>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputCity">Charging</label>
                                        <select id="inputState" onChange={this.onChange} name={'charging'}
                                                className="form-control">
                                            <option selected>Choose...</option>
                                            {this.state.charging.map(port => <option>{port.type}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputState">Audio</label>
                                        <select id="inputState" onChange={this.onChange} name={'audio'}
                                                className="form-control">
                                            <option selected>Choose...</option>
                                            <option value={''}>None</option>
                                            {this.state.audio.map(port => <option
                                                value={port.type}>{port.type}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputZip">Bluetooth</label>
                                        <select id="inputState" onChange={this.onChange} name={'bluetooth'}
                                                className="form-control">
                                            <option value={true} selected>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                    </div>
                                </div>


                                <button type="submit" onClick={this.addPhone} className="btn btn-primary btn-lg">Add
                                    phone
                                </button>
                            </form>
                            :
                            <div className='d-flex justify-content-center align-items-center'
                                 style={{flex: 1, width: '100%', height: '70vh'}}>
                                <div className="spinner-grow text-primary" style={{width: '5rem', height: '5rem'}}
                                     role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <div className='col-md-10'>
                        <div className='header'>
                            <h2>Delete Phone</h2>
                        </div>
                        <div className='container'>
                            <div className='row'>
                                {this.state.phones.length > 0 ?


                                    this.state.phones.map(phone => {
                                        return <div className='col-lg-3 pt-5 pl-5 pr-5'><PhoneCard
                                            deletePhone={this.deletePhone} phone={phone}/></div>
                                    })

                                    :
                                    <div className='d-flex justify-content-center align-items-center'
                                         style={{flex: 1, width: '100%', height: '70vh'}}>
                                        <div className="spinner-grow text-primary"
                                             style={{width: '5rem', height: '5rem'}}
                                             role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
            );
        else
            return (
                this.props.selected === '1' ?
                    <div className='col-lg-10 forms'>
                        <div className='header'>
                            <h2>Add New Product</h2>
                        </div>

                        {this.state.allPorts.length > 0 ?
                            <form>
                                <div className="form-group ">
                                    <label htmlFor="inputEmail4">Name</label>
                                    <input type="text" onChange={this.onProductChange} name={'name'}
                                           className="form-control"
                                           id="inputEmail4"/>
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="inputPassword4">Price</label>
                                    <input type="text" onChange={this.onProductChange} name={'price'}
                                           className="form-control"
                                           id="inputPassword4"/>
                                </div>
                                <div className="form-group ">
                                    <select onChange={this.onProductChange} className="form-control" name={'connector'}>
                                        <option>Select connector...</option>
                                        {this.state.allPorts.map(port => <option
                                            value={port.type}>{port.type}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1">Select product image</label>
                                    <input type="file" onChange={this.onProductChange} className="form-control-file"
                                           name={'image'}
                                           id="exampleFormControlFile1"/>
                                </div>


                                <button type="submit" onClick={this.addProduct} className="btn btn-primary btn-lg">Add
                                    product
                                </button>
                            </form>
                            :
                            <div className='d-flex justify-content-center align-items-center'
                                 style={{flex: 1, width: '100%', height: '70vh'}}>
                                <div className="spinner-grow text-primary" style={{width: '5rem', height: '5rem'}}
                                     role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <div className='col-md-10'>
                        <div className='header'>
                            <h2>Delete Phone</h2>
                        </div>
                        <div className='container'>
                            <div className='row'>
                                {this.state.products.length > 0 ?
                                    this.state.products.map((product, index) => {
                                        return <div className='col-lg-3 pt-5 pl-5 pr-5'><ProductCard
                                            deleteProduct={this.deleteProduct} key={index} product={product}/></div>
                                    })
                                    :
                                    <div className='d-flex justify-content-center align-items-center'
                                         style={{flex: 1, width: '100%', height: '70vh'}}>
                                        <div className="spinner-grow text-primary"
                                             style={{width: '5rem', height: '5rem'}}
                                             role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
            );
    }
}

export default Forms;