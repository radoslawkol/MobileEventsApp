import { Image, View, Text, StyleSheet } from "react-native";

export default function LogoTitle() {
	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/images/favicon.png")}
				style={styles.image}
			/>
			<Text style={styles.title}>EventsApp</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		width: 40,
		height: 40,
	},
	title: {
		fontSize: 20,
	},
});
