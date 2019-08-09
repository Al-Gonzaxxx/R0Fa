import  React, { useState }from "react";
//import { BrowserRouter, Route, Redirect, Switch,Link } from 'react-router-dom';
//import UserContext from '';
import LoginForm from './loginForm';
import SignupForm from './signupForm';


const AdminMain= () => {
	const [whichForm, setForm] = useState(true);
	//console.log();

return (
	<div>
		<ul>
			
			<li>
				<button onClick={()=>{ if(!whichForm) setForm(!whichForm)}} disabled={whichForm}>  Login </button>
			</li>
			
			<li>
				<button onClick={()=>{ if(whichForm) setForm(!whichForm)}} disabled={!whichForm}> SignUp </button>
			</li>
			
		</ul>
		{whichForm && <LoginForm />}
		{!whichForm && <SignupForm />}
	</div>
	
);
}


export default AdminMain;




