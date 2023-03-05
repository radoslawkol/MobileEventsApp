import { View, Text, StyleSheet, Image } from "react-native";
import EventDetails from "../components/EventDetails";
import IconButton from "../components/ui/IconButton";
import Colors from "../constants/Colors";
import { getMapPreview } from "../utils/getMapPreview";

export default function ViewMapScreen() {
	const data = {
		title: "San Francisco Rock Festival",
		address: "San Francisco, Long Street 34",
		geolocation: {
			lat: 37.772275,
			lng: -122.392992,
		},
		date: "23.02.2023",
		time: "14.30",
		price: 25,
		maxMembers: 1550,
	};

	function followHandler() {}
	return (
		<View>
			<View>
				<Image
					style={styles.map}
					source={{
						uri: getMapPreview(data.title, data.geolocation),
					}}
				/>
			</View>
			<View style={styles.bannerContainer}>
				<Text style={styles.text}>{data.title}</Text>
				<IconButton
					icon='user'
					size={20}
					color={Colors.textLight}
					onPress={followHandler}
				>
					Follow
				</IconButton>
			</View>
			<EventDetails {...data} style={styles.detailsCntainer} />
		</View>
	);
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: 400,
	},
	detailsCntainer: {
		paddingHorizontal: 30,
		marginVertical: 20,
	},
	text: {
		width: "70%",
		fontSize: 16,
		fontWeight: "400",
		color: Colors.secondary,
		letterSpacing: 0.5,
		lineHeight: 22,
		textTransform: "uppercase",
	},
	bannerContainer: {
		flexWrap: "wrap",
		paddingHorizontal: 30,
		paddingVertical: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderTopWidth: 1,
		borderTopColor: Colors.secondary,
		borderBottomWidth: 1,
		borderBottomColor: Colors.secondary,
	},
});
