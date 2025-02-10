import axios from "axios";
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
    const apiURL = `${basePath}/personalityCoffee`;
    const result = await axios.get(apiURL);
    if (result.data) {
        return result.data;
    }
    return [];
}