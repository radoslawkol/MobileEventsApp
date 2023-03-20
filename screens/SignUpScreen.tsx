import React, { useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Colors from "../constants/Colors";
import HeadingIcon from "../components/ui/HeadingIcon";
import IconButton from "../components/ui/IconButton";
import * as yup from "yup";
import { useYupValidationResolver } from "../lib/reactHookForm";
import FormGroup from "../components/FormGroup";
import ErrorMessage from "../components/ui/ErrorMessage";
import { AuthContext } from "../store/authContext";
import { FormData } from "../interfaces/FormData";
import { createUserAccount } from "../helpers/createUserAccount";
import { INavigation } from "../interfaces/INavigation";

type ErrorData = {
	[key: string]: {
		message: string;
		type: string;
	};
};

const validationSchema = yup.object({
	firstName: yup
		.string()
		.min(2, "First Name cannot be less than 2 characters")
		.max(30, "First Name cannot be more than 30 characters")
		.required("First Name is required."),
	surname: yup
		.string()
		.min(2, "Surname cannot be less than 2 characters")
		.max(36, "Surname cannot be more than 36 characters")
		.required("Surname is required."),
	email: yup
		.string()
		.email("Email has to be valid.")
		.required("Email is required."),
	password: yup
		.string()
		.min(6, "Password is not valid. Min 6 characters.")
		.max(20, "Password is not valid. Max 20 characters.")
		.required("Password is required."),
	confirmPassword: yup
		.string()
		.required("Confirm Password is required.")
		.oneOf([yup.ref("password")], "Passwords don't match."),
});

export default function SignUpScreen({ navigation }: INavigation) {
	const [state, dispatch] = useContext(AuthContext);
	const [error, setError] = useState("");
	const resolver = useYupValidationResolver(validationSchema);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver });

	function submitHandler(data: FormData) {
		createUserAccount(data, setError, state, dispatch, navigation);
	}

	return (
		<ScrollView style={styles.wrapper}>
			<HeadingIcon icon='user' size={24} color={Colors.secondary}>
				Sign Up
			</HeadingIcon>
			<View style={styles.formContainer}>
				<Controller
					name='firstName'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormGroup
							errors={errors as ErrorData}
							name='firstName'
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							defaultValue=''
						/>
					)}
				/>
				<Controller
					name='surname'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormGroup
							errors={errors as ErrorData}
							name='surname'
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							defaultValue=''
						/>
					)}
				/>
				<Controller
					name='email'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormGroup
							errors={errors as ErrorData}
							name='email'
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							defaultValue=''
						/>
					)}
				/>
				<Controller
					name='password'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormGroup
							errors={errors as ErrorData}
							name='password'
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							defaultValue=''
						/>
					)}
				/>
				<Controller
					name='confirmPassword'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormGroup
							errors={errors as ErrorData}
							name='confirmPassword'
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							defaultValue=''
						/>
					)}
				/>
				<IconButton
					icon='user'
					color={Colors.textLight}
					size={20}
					onPress={handleSubmit(submitHandler)}
					testID='registerBtn'
				>
					Register
				</IconButton>
				{error && <ErrorMessage>{error}</ErrorMessage>}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingHorizontal: 40,
		marginVertical: 40,
	},
	formContainer: {
		justifyContent: "space-around",
		marginVertical: 20,
	},
});
