import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

interface IProps {
	children: string | JSX.Element;
}

export default function ErrorMessage({ children }: IProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 16,
		padding: 6,
		borderRadius: 10,
		backgroundColor: Colors.error,
	},
	text: {
		fontSize: 14,
		color: Colors.textLight,
	},
});
