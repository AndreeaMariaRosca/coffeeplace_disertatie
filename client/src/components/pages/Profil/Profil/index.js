import './ProfilClient.css';
import UserDetails from '../UserDetails';
import OrderHistory from '../../OrderHistoryPage/OrderHistory';

import Layout from "../../../navbar/Layout";

const ProfilClient = ({ user }) => {
    console.log(`profil ${JSON.stringify(user)}`);

    return (
        <Layout>
            <UserDetails user={user}/>
            <OrderHistory userId={user._id} />
        </Layout>
    )
}

export default ProfilClient;           
