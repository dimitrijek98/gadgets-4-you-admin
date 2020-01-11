import React, {Component} from 'react';
import {regioni} from "../../Regioni";

class Forms extends Component {
    constructor(props) {
        super(props);
        this.regions = regioni;
    }

    render() {
        return (
            <div className='col-lg-10 forms'>
                <div className='header'>
                    <h2>{this.props.selected ==='1'? 'Nove Sume': this.props.selected==='2'? 'Smanjenje suma': 'Sume'}</h2>
                </div>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" className="form-control" id="inputEmail4"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Password</label>
                            <input type="password" className="form-control" id="inputPassword4"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Address 2</label>
                        <input type="text" className="form-control" id="inputAddress2"
                               placeholder="Apartment, studio, or floor"/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputCity">City</label>
                            <input type="text" className="form-control" id="inputCity"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputState">State</label>
                            <select id="inputState" className="form-control">
                                <option selected>Choose...</option>
                                {this.regions.map(region => <option >{region.naziv}</option>)}
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputZip">Zip</label>
                            <input type="text" className="form-control" id="inputZip"/>
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary btn-lg">Sacuvaj</button>
                </form>
            </div>
        );
    }
}

export default Forms;