import { SvgUri } from "react-native-svg";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import { useContext } from "react";
import { AuthContext } from "../store/authContext";

export default function AccountScreen() {
	const [state, dispatch] = useContext(AuthContext);
	const { firstName, email, followed, eventsAdded } = state.user;
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>
				Welcome, <Text style={styles.headingStrong}>{firstName}</Text>
			</Text>
			<Text style={styles.subHeading}>
				Have a nice time in our app. We hope you like it.
			</Text>

			<View style={styles.list}>
				<View style={styles.item}>
					<Text style={styles.itemLabel}>email:</Text>
					<Text>{email}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.itemLabel}>followed Events:</Text>
					<Text>{followed.length}</Text>
				</View>
			</View>
			<View>
				<SvgUri
					style={styles.image}
					width='100%'
					height='100%'
					uri='https://res.cloudinary.com/detfhw9ll/image/upload/v1677613799/eventsMobileApp/assets/undraw_festivities_tvvj_tqzs83.svg'
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 40,
		paddingTop: 60,
	},
	heading: {
		marginBottom: 16,
		fontSize: 24,
		color: Colors.textDark,
	},
	headingStrong: {
		color: Colors.secondary,
	},
	subHeading: {
		fontSize: 18,
		color: Colors.textDark,
	},
	list: {
		marginTop: 40,
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	itemLabel: {
		marginRight: 10,
		color: Colors.secondary,
	},
	image: {
		transform: [{ translateY: -200 }],
	},
});
