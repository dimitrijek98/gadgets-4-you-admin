import ApiService from "./ApiService";
import axios from "axios";

export default class AuthService extends ApiService {
    Login(email, password){
        return axios.post(`${this.baseUrl}login`, {password:password, email:email});        
    }
}