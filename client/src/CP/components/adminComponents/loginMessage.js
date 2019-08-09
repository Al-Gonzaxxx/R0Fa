import  React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { LoginMutation } from "../../../query/authQ";


function LoginMessage( {email, password}){
  	
	console.log(email);
	console.log(password);

  	const { loading, error, data } = useMutation(LoginMutation, {
  		    variables: { email, password },
  	});

  	console.log(loading);

  	console.log(error);

  	console.log(data);

  	if(loading)
  		return <h1>Loading</h1>;
  	if(error)
  		return <h1>ERROR LOGIN</h1>;


  	console.log(data);

	return (
		<div>
		<ul>
			<li>token  : </li>
			<li>userID : </li>
		</ul>	
		</div>
	);
}

export default LoginMessage;