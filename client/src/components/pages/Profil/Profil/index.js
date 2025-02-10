import './ProfilClient.css';
import UserDetails from '../UserDetails';
import CreateForm from './CreateForm';
import Layout from "../../../navbar/Layout";
import { VStack } from '@chakra-ui/react';

const ProfilClient = ({ user }) => {
    console.log(`profil ${JSON.stringify(user)}`);

    return (
        <>
            <UserDetails user={user}/>
            {/* <CreateForm /> */}
        </>
    )
}

export default ProfilClient;           
