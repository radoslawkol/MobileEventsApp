import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

type ErrorObject = {
	[key: string]: {
		message: string;
		type: string;
	};
};

interface IProps {
	value: string;
	name: string;
	defaultValue: string;
	numeric?: boolean;
	maxLength?: number;
	onChange: (...event: any[]) => void;
	onBlur: () => void;
	errors: ErrorObject;
}

export default function FormGroup({
	value,
	name,
	onChange,
	onBlur,
	defaultValue,
	errors = {},
	maxLength,
	numeric,
}: IProps) {
	const label = name.charAt(0).toUpperCase() + name.slice(1);
	// console.log(errors);
	return (
		<>
			<View style={styles.group}>
				<Text style={styles.label}>{label}</Text>
				<TextInput
					keyboardType={numeric ? "numeric" : "default"}
					testID={name + "Input"}
					secureTextEntry={
						name === "password" || name === "confirmPassword" ? true : false
					}
					style={styles.input}
					value={value}
					onChangeText={onChange}
					onBlur={onBlur}
					defaultValue={defaultValue}
				/>
				{errors[name] && (
					<Text style={styles.errorMessage}>{errors[name].message}</Text>
				)}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	group: {
		marginBottom: 30,
	},
	input: {
		marginBottom: 24,
		padding: 8,
		fontSize: 16,
		color: Colors.secondary,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.secondary,
	},
	label: {
		color: Colors.secondary,
		margin: 4,
	},
	errorMessage: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		color: Colors.textLight,
		borderRadius: 10,
		backgroundColor: Colors.error,
		transform: [{ translateY: -15 }],
	},
});
