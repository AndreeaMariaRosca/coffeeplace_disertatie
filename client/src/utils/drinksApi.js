import axios from "axios";
import { getUserId } from "./storage";

const basePath = "http://localhost:8080/api";

export const getCoffees = async () => {
    const apiURL = `${basePath}/coffees`;
    const result = await axios.get(apiURL);
    if (result.data) {
        return result.data;
    }
    return [];
}

export const getBeverages = async () => {
    const apiURL = `${basePath}/beverages`;
    const result = await axios.get(apiURL);
    if (result.data) {
        return result.data;
    }
    return [];
}

export const getPersonalityCoffee = async () => {
    const apiURL = `${basePath}/personalityCoffees`;
    const result = await axios.get(apiURL);
    if (result.data) {
        return result.data;
    }
    return [];
}

export const addToCart = async (itemId, itemType, quantity) => {
    const apiURL = `${basePath}/cart/add`;
    const result = await axios.post(apiURL, { userId: getUserId(), itemId, itemType, quantity });
    if (result.data) {
        return result.data;
    }
    return [];
}

export const addToCartCustom = async (item) => {
    const apiURL = `${basePath}/cart/add-custom`;
    const result = await axios.post(apiURL, { userId: getUserId(), item });
    if (result.data) {
        return result.data;
    }
    return [];
}