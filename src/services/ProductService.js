import ApiService from "./ApiService";
import axios from "axios";

export default class ProductService extends ApiService {
    getSellersProducts(sellerEmail) {
        return axios.get(`${this.baseUrl}seller-products`, {params: {seller: sellerEmail}})
    }

    addProduct(product) {
        return axios.post(`${this.baseUrl}add-product`, {product})
    }

    uploadProductImage(data) {
        return axios.post(`${this.baseUrl}upload-product-image`, data)
    }

    deleteProduct(product) {
        return axios.post(`${this.baseUrl}delete-product`,  {product})
    }
}