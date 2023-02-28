import { View, Text, StyleSheet, FlatList } from "react-native";
import FavouriteCard from "../components/FavouriteCard";
import HeadingIcon from "../components/ui/HeadingIcon";
import Colors from "../constants/Colors";

const data = [
	{
		id: "0",
		name: "Rock Festival San Francisco",
		date: "23.05.2023",
		time: "6.00",
	},
	{
		id: "1",
		name: "Pop Music New York",
		date: "23.05.2023",
		time: "6.00",
	},
	{
		id: "2",
		name: "Country Festival in New Yersey",
		date: "23.05.2023",
		time: "6.00",
	},
	{
		id: "3",
		name: "Country Festival in New Yersey",
		date: "23.05.2023",
		time: "6.00",
	},
	{
		id: "4",
		name: "Country Festival in New Yersey",
		date: "23.05.2023",
		time: "6.00",
	},
	{
		id: "5",
		name: "Country Festival in New Yersey",
		date: "23.05.2023",
		time: "6.00",
	},
	{
		id: "6",
		name: "Country Festival in New Yersey",
		date: "23.05.2023",
		time: "6.00",
	},
];

export default function FavouritesScreen() {
	return (
		<View style={styles.container}>
			<HeadingIcon icon='bookmark' size={24} color={Colors.secondary}>
				Followed Events
			</HeadingIcon>
			<FlatList
				style={styles.list}
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <FavouriteCard item={item} />}
			/>
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
});
