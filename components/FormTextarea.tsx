import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

type ErrorObject = {
	[key: string]: {
		message: string;
		type: string;
	};
};

interface IProps {
	MAX_WORDS: number;
	value: string;
	name: string;
	defaultValue: string;
	onChange: (...event: any[]) => void;
	onBlur: () => void;
	errors: ErrorObject;
}

export default function FormTextarea({
	MAX_WORDS,
	value,
	name,
	onChange,
	onBlur,
	defaultValue,
	errors = {},
}: IProps) {
	const [words, setWords] = useState(0);
	const label = name.charAt(0).toUpperCase() + name.slice(1);

	function countWords(text: string) {
		const words = text.trim().split(" ").length;
		setWords(words);
	}

	function changeTextHandler(text: string) {
		countWords(text);
		onChange(text);
	}
	return (
		<>
			<View style={styles.group}>
				<Text style={styles.label}>{label}</Text>
				<TextInput
					multiline={true}
					numberOfLines={6}
					testID={name + "Input"}
					style={styles.input}
					value={value}
					onChangeText={changeTextHandler}
					onBlur={onBlur}
					defaultValue={defaultValue}
				/>
				<Text style={styles.counter}>
					{words}/{MAX_WORDS}
				</Text>
			</View>
			{errors[name] && (
				<Text style={styles.errorMessage}>{errors[name].message}</Text>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	group: {
		marginBottom: 30,
	},
	input: {
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
	counter: {
		margin: 4,
		flexDirection: "row",
		alignSelf: "flex-end",
		color: Colors.secondary,
	},
});
