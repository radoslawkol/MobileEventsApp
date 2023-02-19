import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import Colors from "../constants/Colors";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import LogoTitle from "../components/LogoTitle";

export default function Navigator() {
	function BottomTab() {
		const BottomTab = createBottomTabNavigator();
		return (
			<BottomTab.Navigator
				screenOptions={{
					headerTitle: (props) => <LogoTitle {...props} />,
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

	return (
		<NavigationContainer>
			<BottomTab />
		</NavigationContainer>
	);
}
