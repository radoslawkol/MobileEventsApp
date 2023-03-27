import { View, Text, StyleSheet, Image } from "react-native";
import EventDetails from "../components/EventDetails";
import IconButton from "../components/ui/IconButton";
import Colors from "../constants/Colors";
import { getMapPreview } from "../utils/getMapPreview";
import { useContext, useState } from "react";
import { AuthContext } from "../store/authContext";
import { followingHelper } from "../helpers/followingHelper";

export default function ViewMapScreen({ route }) {
	const [state, dispatch] = useContext(AuthContext);
	const [event, setEvent] = useState(route.params.event);

	return (
		<View>
			<View>
				{event && (
					<Image
						style={styles.map}
						source={{
							uri: getMapPreview(event.eventName, event.coordinates),
						}}
					/>
				)}
			</View>
			<View style={styles.bannerContainer}>
				<Text style={styles.text}>{event.eventName}</Text>
				{state && (
					<IconButton
						icon='user'
						size={20}
						color={Colors.textLight}
						onPress={() => {}}
					>
						{route.params.isEventFollowed ? "Unfollow" : "Follow"}
					</IconButton>
				)}
			</View>
			<EventDetails {...event} style={styles.detailsCntainer} />
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
		width: "66%",
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
