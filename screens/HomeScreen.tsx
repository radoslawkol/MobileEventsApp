import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default function HomeScreen() {
	return (
		<View>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder='Search for a city'
					style={styles.input}
					placeholderTextColor={Colors.secondary}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		margin: 30,
	},
	input: {
		padding: 8,
		fontSize: 16,
		color: Colors.secondary,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.secondary,
	},
});
