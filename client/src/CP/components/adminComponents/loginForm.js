import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

import { LoginMutation } from "../../../query/authQ";




const LoginForm =(props) =>{

	const [userId, setUserId] = useState(null);
	const [login, { data,loading,error }] = useMutation(LoginMutation);
	const [errorMsg, setErrMsg] = useState(null);

	return (
	<Formik
	initialValues = {{email: "", password: ""}}
	onSubmit={(values, {setSubmitting}) => 
	{
		setSubmitting(true);
		login({variables:{email: values.email, password: values.password}})
		.then( (data) => {
			console.log(data.data);
			setUserId(data.data.login.userId);
			props.history.push('/adminhome');
		})
		.catch((e)=>{
			console.log(e);
			if(e){
			console.log(e.graphQLErrors[0].message);
			setErrMsg(e.graphQLErrors[0].message);
			}
			setSubmitting(false);
		});
	}}
	
	validationSchema={Yup.object().shape({
		email: Yup.string()
			.email()
			.required("Required."),
		password: Yup.string()
			.required("Required.")
	})}
	>
	{props => {
		const {
			values,
			touched,
			errors,
			isSubmitting,
			handleChange,
			handleBlur,
			handleSubmit
		}= props;
		return (
			<form onSubmit={handleSubmit} >
			<div>
				<h1>
					Login
				</h1>
			</div>
			<label htmlFor="email">Email</label>
			<input
				name="email"
				type="text"
				placeholder="Enter your email"
				value={values.email}
				onChange={handleChange}
				onBlur={handleBlur}
				className={errors.email && touched.email && "error"}
			/>
			{errors.email && touched.email && (
				<div className="input-feedback">{errors.email}</div>
				)}
			<label htmlFor="password">Password</label>
			<input
				name="password"
				type="password"
				placeholder="Enter your password"
				value={values.password}
				onChange={handleChange}
				onBlur={handleBlur}
				className={errors.password && touched.password && "error"}
			/>
			{(error || errors.password) && touched.password && (
				<div className="input-feedback"> {errors.password || errorMsg }</div>
				)}
			<button type="submit" disabled={loading || isSubmitting}>
				Login
			</button>
			</form>
		);
		}}
	</Formik>
);
};

export default withRouter(LoginForm);

