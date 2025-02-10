import { getCurrentUser } from "./utils/userApi";
import ProfilClient from "./Profil"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "../../navbar/Layout";



const Profil = () => {
    // get user by id
    const [user, setUser] = useState({});
    const history = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const user = await getCurrentUser();
            if (user) {
                console.log(`====useeffect user ${JSON.stringify(user)}`);
                setUser(user.data);
            } else {
                // no current user logged in so navigating to login
                history('/');
            }
        }
        getData();
    }, []);

    return <ProfilClient user={user} />
}

export default Profil


