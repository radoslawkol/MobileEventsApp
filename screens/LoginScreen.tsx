import { View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Colors from "../constants/Colors";
import HeadingIcon from "../components/ui/HeadingIcon";
import IconButton from "../components/ui/IconButton";
import * as yup from "yup";
import { useYupValidationResolver } from "../lib/reactHookForm";
import FormGroup from "../components/FormGroup";

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

export default function LoginScreen() {
	const resolver = useYupValidationResolver(validationSchema);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver });

	const submitHandler = (data: FormData) => {
		console.log(data);
	};

	return (
		<View style={styles.wrapper}>
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
				>
					Log in
				</IconButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingHorizontal: 40,
		paddingVertical: 40,
	},
	formContainer: {
		justifyContent: "space-around",
		marginVertical: 20,
	},
});
