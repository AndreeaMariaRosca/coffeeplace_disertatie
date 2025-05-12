import { getCurrentUser } from "./utils/userApi";
import ProfilClient from "./Profil"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Profil = () => {
    const [user, setUser] = useState({});
    const history = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const user = await getCurrentUser();
            if (user) {
                setUser(user.data);
            } else {
                history('/');
            }
        }
        getData();
    }, []);

    return <ProfilClient user={user} />
}

export default Profil


