import { NavigationContainer } from "@react-navigation/native";
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

export default function Navigator() {
	function BottomTab() {
		const BottomTab = createBottomTabNavigator();

		return (
			<BottomTab.Navigator
				screenOptions={{
					headerTitle: (props) => <LogoTitle />,
					headerTintColor: Colors.textDark,
					tabBarStyle: { backgroundColor: Colors.secondary },
					tabBarActiveTintColor: Colors.lightActive,
					tabBarInactiveTintColor: Colors.lightInActive,
				}}
			>
				<BottomTab.Screen
					name='Home'
					component={HomeScreen}
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

	function AuthenticatedBottomTab() {
		const BottomTabAccount = createBottomTabNavigator();

		return (
			<BottomTabAccount.Navigator
				screenOptions={{
					headerTitle: (props) => <LogoTitle />,
					headerTintColor: Colors.textDark,
					tabBarStyle: { backgroundColor: Colors.secondary },
					tabBarActiveTintColor: Colors.lightActive,
					tabBarInactiveTintColor: Colors.lightInActive,
					headerRight: () => <LogoutBtn />,
				}}
			>
				<BottomTabAccount.Screen
					name='Home'
					component={HomeScreen}
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

	let isAuthenticated = false;
	return (
		<NavigationContainer>
			{isAuthenticated ? <AuthenticatedBottomTab /> : <BottomTab />}
		</NavigationContainer>
	);
}
