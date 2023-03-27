import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { convertDateToStr } from "../utils/convertDateToStr";
import { convertDateToTimeStr } from "../utils/convertDateToTimeStr";
import IconButton from "./ui/IconButton";

type ErrorObject = {
	[key: string]: {
		message: string;
		type: string;
	};
};

interface IProps {
	mode?: "time";
	value: Date;
	name: string;
	defaultValue: Date;
	onButtonClick: () => void;
	onChange: (...event: any[]) => void;
	onBlur: () => void;
	errors: ErrorObject;
}

export default function FormDateInput({
	mode,
	value = new Date(),
	name,
	onChange,
	onBlur,
	defaultValue = new Date(),
	onButtonClick,
	errors = {},
}: IProps) {
	const label = name.charAt(0).toUpperCase() + name.slice(1);
	console.log(errors);

	return (
		<View style={styles.group}>
			<Text style={styles.label}>{label}</Text>
			<View style={[styles.container, mode === "time" && { width: 270 }]}>
				<TextInput
					editable={false}
					testID={name + "Input"}
					style={styles.input}
					value={
						mode === "time"
							? convertDateToTimeStr(value)
							: convertDateToStr(value)
					}
					onChangeText={onChange}
					onBlur={onBlur}
					defaultValue={
						mode === "time"
							? convertDateToTimeStr(defaultValue)
							: convertDateToStr(defaultValue)
					}
				/>
				<IconButton
					icon='calendar'
					size={20}
					color={Colors.textLight}
					onPress={onButtonClick}
				>
					{mode === "time" ? "Set Time" : "Set Datetime"}
				</IconButton>
			</View>
			{errors[name] && (
				<Text style={styles.errorMessage}>{errors[name].message}</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	group: {
		marginBottom: 10,
	},
	container: {
		width: 300,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	input: {
		width: 150,
		padding: 4,
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
		transform: [{ translateY: 14 }],
	},
});
