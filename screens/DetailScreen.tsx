import { View, Text, Image, StyleSheet, ScrollView, Alert } from "react-native";
import EventDetails from "../components/EventDetails";
import IconButton from "../components/ui/IconButton";
import OutlineButton from "../components/ui/OutlineButton";
import Colors from "../constants/Colors";
import { useState, useContext, useEffect } from "react";
import { useGetEventDetails } from "../hooks/useGetEventDetails";
import { AuthContext } from "../store/authContext";
import { followingHelper } from "../helpers/followingHelper";
import { IEvent } from "../interfaces/IEvent";

interface IProps {
	navigation: { navigate: (screen: string, event: IEvent) => void };
}

export default function DetailScreen({ navigation, route }: IProps) {
	const [event, setEvent] = useState({});
	const [error, setError] = useState("");
	const [state, dispatch] = useContext(AuthContext);
	const [isEventFollowed, setIsEventFollowed] = useState(false);

	function navigateHandler() {
		navigation.navigate("ViewMap", {
			event,
			isEventFollowed,
		});
	}

	function followHandler() {
		followingHelper(
			event._id,
			setIsEventFollowed((prev) => !prev),
			state.token
		);
	}

	useGetEventDetails(setEvent, setError, route.params.eventId);

	useEffect(() => {
		const isFollowed = state?.user.followed?.find(
			(followedEvent: string) => followedEvent === event._id
		);
		setIsEventFollowed(isFollowed ? true : false);
	}, [event]);

	return (
		<>
			<ScrollView style={styles.container}>
				<View>
					<Image
						style={styles.image}
						source={{
							uri: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
						}}
					/>
				</View>

				<View>
					<Text style={styles.title}>{event?.eventName}</Text>
					<Text style={styles.description}>{event?.description}</Text>
				</View>
				<EventDetails {...event} />
				<View style={styles.buttonContainer}>
					{state && (
						<IconButton
							icon='user'
							size={20}
							color={Colors.textLight}
							onPress={followHandler}
						>
							{isEventFollowed ? "Unfollow" : "Follow"}
						</IconButton>
					)}
					<OutlineButton
						icon='map'
						style={styles.outlineBtn}
						size={20}
						color={Colors.secondary}
						onPress={navigateHandler}
					>
						View on Map
					</OutlineButton>
				</View>
			</ScrollView>
			{error && Alert.alert("Cannot fetch an event", error)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 30,
		paddingHorizontal: 32,
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 20,
	},
	title: {
		marginTop: 30,
		marginBottom: 16,
		fontSize: 22,
		fontWeight: "bold",
		color: Colors.textDark,
	},
	description: {
		fontSize: 16,
		color: Colors.textDark,
		letterSpacing: 1,
		lineHeight: 20,
	},

	buttonContainer: {
		width: 260,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	outlineBtn: {
		color: Colors.secondary,
		borderColor: Colors.secondary,
	},
});
