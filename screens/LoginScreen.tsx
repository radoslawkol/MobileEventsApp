import React, { useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Colors from "../constants/Colors";
import HeadingIcon from "../components/ui/HeadingIcon";
import IconButton from "../components/ui/IconButton";
import * as yup from "yup";
import { useYupValidationResolver } from "../lib/reactHookForm";
import FormGroup from "../components/FormGroup";
import { AuthContext } from "../store/authContext";
import ErrorMessage from "../components/ui/ErrorMessage";
import { loginUser } from "../helpers/loginUser";

type FormData = {
	email: string;
	password: string;
};

type ErrorData = {
	[key: string]: {
		message: string;
		type: string;
	};
};

const validationSchema = yup.object({
	email: yup
		.string()
		.email("Email has to be valid.")
		.required("Email is required."),
	password: yup
		.string()
		.min(6, "Password is not valid. Min 6 characters.")
		.max(20, "Password is not valid. Max 20 characters.")
		.required("Password is required."),
});

interface IProps {
	navigation: { navigate: (name: string) => void };
}

export default function LoginScreen({ navigation }: IProps) {
	const [state, dispatch] = useContext(AuthContext);
	const [error, setError] = useState("");
	const resolver = useYupValidationResolver(validationSchema);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver });

	const submitHandler = async (data: FormData) => {
		loginUser(data, setError, state, dispatch, navigation);
	};

	return (
		<ScrollView style={styles.wrapper}>
			<HeadingIcon icon='login' size={24} color={Colors.secondary}>
				Log In
			</HeadingIcon>
			<View style={styles.formContainer}>
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
				<IconButton
					icon='user'
					color={Colors.textLight}
					size={20}
					onPress={handleSubmit(submitHandler)}
					testID='loginBtn'
				>
					Log in
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
