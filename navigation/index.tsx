import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import Colors from "../constants/Colors";
import {
	AntDesign,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import LogoTitle from "../components/LogoTitle";
import AccountScreen from "../screens/AccountScreen";
import AddEventScreen from "../screens/AddEventScreen";
import LogoutBtn from "../components/LogoutBtn";
import FavouritesScreen from "../screens/FavouritesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "../screens/DetailScreen";
import ViewMapScreen from "../screens/ViewMapScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../store/authContext";

export default function Navigator() {
	const [state, dispatch] = useContext(AuthContext);

	function BottomTab() {
		const BottomTab = createBottomTabNavigator();

		return (
			<BottomTab.Navigator
				screenOptions={({ route }) => {
					const currentRoute = getFocusedRouteNameFromRoute(route);
					return {
						headerShown:
							currentRoute === "Detail"
								? false
								: currentRoute === "ViewMap"
								? false
								: true,
						headerTitle: (props) => <LogoTitle />,
						headerTintColor: Colors.textDark,
						tabBarStyle: { backgroundColor: Colors.secondary },
						tabBarActiveTintColor: Colors.lightActive,
						tabBarInactiveTintColor: Colors.lightInActive,
					};
				}}
			>
				<BottomTab.Screen
					name='Home'
					component={HomeStack}
					options={{
						tabBarIcon: ({ color, size }) => (
							<AntDesign name='home' size={size} color={color} />
						),
					}}
				/>
				<BottomTab.Screen
					name='Login'
					component={LoginScreen}
					options={{
						title: "Login",
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name='login' size={size} color={color} />
						),
					}}
				/>
				<BottomTab.Screen
					name='SignUp'
					component={SignUpScreen}
					options={{
						tabBarIcon: ({ color, size }) => (
							<AntDesign name='adduser' size={size} color={color} />
						),
					}}
				/>
			</BottomTab.Navigator>
		);
	}

	function HomeStack() {
		const Stack = createNativeStackNavigator();
		return (
			<Stack.Navigator>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='Detail'
					component={DetailScreen}
					options={{
						title: "About Event",
					}}
				/>
				<Stack.Screen
					name='ViewMap'
					component={ViewMapScreen}
					options={{ title: "Location" }}
				/>
			</Stack.Navigator>
		);
	}

	function AuthenticatedBottomTab() {
		const BottomTabAccount = createBottomTabNavigator();
		return (
			<BottomTabAccount.Navigator
				screenOptions={({ route }) => {
					console.log(getFocusedRouteNameFromRoute(route));
					const currentRoute = getFocusedRouteNameFromRoute(route);
					return {
						headerShown:
							currentRoute === "Detail"
								? false
								: currentRoute === "ViewMap"
								? false
								: true,
						headerTitle: (props) => <LogoTitle />,
						headerTintColor: Colors.textDark,
						tabBarStyle: { backgroundColor: Colors.secondary },
						tabBarActiveTintColor: Colors.lightActive,
						tabBarInactiveTintColor: Colors.lightInActive,
						headerRight: () => <LogoutBtn />,
					};
				}}
			>
				<BottomTabAccount.Screen
					name='Home'
					component={HomeStack}
					options={{
						tabBarIcon: ({ color, size }) => (
							<AntDesign name='home' size={size} color={color} />
						),
					}}
				/>
				<BottomTabAccount.Screen
					name='Account'
					component={AccountScreen}
					options={{
						tabBarIcon: ({ color, size }) => (
							<AntDesign name='user' size={size} color={color} />
						),
					}}
				/>
				<BottomTabAccount.Screen
					name='AddEvent'
					component={AddEventScreen}
					options={{
						title: "Add Event",
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name='plus' size={size} color={color} />
						),
					}}
				/>
				<BottomTabAccount.Screen
					name='Favourites'
					component={FavouritesScreen}
					options={{
						title: "Favourites Events",
						tabBarIcon: ({ color, size }) => (
							<FontAwesome5 name='bookmark' size={size} color={color} />
						),
					}}
				/>
			</BottomTabAccount.Navigator>
		);
	}

	let isAuthenticated = state?.user ? true : false;
	return (
		<NavigationContainer>
			{isAuthenticated ? <AuthenticatedBottomTab /> : <BottomTab />}
		</NavigationContainer>
	);
}
