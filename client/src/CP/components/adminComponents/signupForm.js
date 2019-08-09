import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const SignupForm = () => (
	
	<Formik
	initialValues = {{email: "", password: ""}}
	onSubmit={(values, {setSubmitting}) => {
		setTimeout(()=>{
			console.log("Thank you for signing up",values);
			setSubmitting(false);
		}, 500);
	}}
	validationSchema={Yup.object().shape({
		email: Yup.string()
			.email()
			.required("Required."),
		firstname: Yup.string()
			.required("Required."),
		lastname: Yup.string()
			.required("Required."),
		password: Yup.string()
			.required("Required.")
			.min(10,"Password is too short, should be 10 chars minimum")
			.matches(/(?=.*[0-9])/,"Password must contain one number")
			.matches(/(?=.*[A-Z])/,"Password must contain one upper case letter")
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
			
			<form onSubmit={handleSubmit}>
			<div>
				<h1>
					SignUp
				</h1>
			</div>
			<label htmlFor="firstname">Firstname</label>
			<input
				name="firstname"
				type="text"
				placeholder="Enter your firstname"
				value={values.firstname}
				onChange={handleChange}
				onBlur={handleBlur}
				className={errors.firstname && touched.firstname && "error"}
			/>
			<label htmlFor="lastname">Lastname</label>
			<input
				name="lastname"
				type="text"
				placeholder="Enter your lastname"
				value={values.lastname}
				onChange={handleChange}
				onBlur={handleBlur}
				className={errors.lastname && touched.lastname && "error"}
			/>
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
				className={errors.password && touched.passowrd && "error"}
			/>
			{errors.password && touched.password && (
				<div className="input-feedback"> {errors.password}</div>
				)}
			<button type="submit" disabled={isSubmitting}>
				SignUp
			</button>
			</form>
		);
	}}
</Formik>
);

export default SignupForm;

