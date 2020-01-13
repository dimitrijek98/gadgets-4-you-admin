import ApiService from "./ApiService";
import axios from 'axios';

export default class PhoneService extends ApiService{

    getPhoneModels(){
        return axios.get(`${this.baseUrl}phone-models`);
    }

    getAllPorts(){
        return axios.get(`${this.baseUrl}all-ports`)
    }

    getChargingPorts(){
        return axios.get(`${this.baseUrl}charging-ports`);
    }

    getAudioPorts(){
        return axios.get(`${this.baseUrl}audio-ports`);
    }

    addPhone(phone){
        return axios.post(`${this.baseUrl}add-phone`, {phone})
    }

    deletePhone(phone){
        return axios.post(`${this.baseUrl}delete-phone`, {phone})
    }
}