import axios from 'axios';
import { getUserId } from '../../../../utils/storage';

export const getCurrentUser = async () => {
    const userId = getUserId();
    if (!userId) {
        return null;
    }

    try {
        const user = await axios
            .get('http://localhost:8080/api/users/' + userId)
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
} 