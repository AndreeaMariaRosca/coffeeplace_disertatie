import axios from "axios";

const apiURL = 'http://localhost:8080/api';

export const getCoffeeResult = async(answers) => {
    const totalPoints = Object.values(answers).reduce((acc, a) => acc + a.points, 0);
    return await axios.get(`${apiURL}/personalityCoffees/${totalPoints}`)
};
