import { useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import FavouriteCard from "../components/FavouriteCard";
import HeadingIcon from "../components/ui/HeadingIcon";
import Colors from "../constants/Colors";
import { AuthContext } from "../store/authContext";
import { useGetFollowedEvents } from "../hooks/useGetFollowedEvents";

export default function FavouritesScreen() {
	const [state, dispatch] = useContext(AuthContext);
	const [data, setData] = useState([]);

	useGetFollowedEvents(state.token, setData);

	return (
		<View style={styles.container}>
			<HeadingIcon icon='bookmark' size={24} color={Colors.secondary}>
				Followed Events
			</HeadingIcon>
			{data.length > 0 ? (
				<FlatList
					style={styles.list}
					data={data}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => <FavouriteCard item={item} />}
				/>
			) : (
				<Text style={styles.infoText}>You don't have followed events.</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 40,
	},
	list: {
		marginTop: 40,
	},
	infoText: {
		marginTop: 10,
		fontSize: 16,
		color: Colors.secondary,
	},
});
