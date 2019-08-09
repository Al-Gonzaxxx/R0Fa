import React from 'react';
import AdminHeader from '../components/adminComponents/adminHeader';
import AdminMain from '../components/adminComponents/adminMain';
import AdminFooter from '../components/adminComponents/adminFooter';
import { useUserContext } from "../../context/UserContext";



const AdminPage = (props) => {
	const { logIn, signUp } = useUserContext();
	return (
		<div>
			<AdminHeader />
			<AdminMain />
			<AdminFooter / >
		</div>
	);
}

export default AdminPage;