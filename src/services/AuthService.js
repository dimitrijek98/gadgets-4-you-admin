import ApiService from "./ApiService";
import axios from "axios";

export default class AuthService extends ApiService {
    Login(email, password, userType){
        if(userType==='admin')
            return axios.post(`${this.baseUrl}admin-login`, {password, email});
        else
            return axios.post(`${this.baseUrl}seller-login`, {password, email});
    }
    getUserType(){
        const user = localStorage.getItem('user');
        return JSON.parse(user).type;
    }

    getUserEmail(){
        const user = localStorage.getItem('user');
        return JSON.parse(user).email;
    }

    getUserName(){
        const user = localStorage.getItem('user');
        return JSON.parse(user).name;
    }
}