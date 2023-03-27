import { useReducer } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext } from "./store/authContext";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { authReducer } from "./store/authContext";
import useCheckIfUserTokenIsValid from "./hooks/useCheckIfUserTokenIsValid";

export default function App() {
	const [state, dispatch] = useReducer(authReducer, null);
	const isLoadingComplete = useCachedResources();

	useCheckIfUserTokenIsValid(state, dispatch);

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<AuthContext.Provider value={[state, dispatch]}>
					<Navigation />
					<StatusBar />
				</AuthContext.Provider>
			</SafeAreaProvider>
		);
	}
}
