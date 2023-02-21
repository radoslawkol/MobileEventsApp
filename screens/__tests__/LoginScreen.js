import LoginScreen from "../LoginScreen";
import { render, screen, fireEvent } from "@testing-library/react-native";

describe("Login Screen", () => {
	it("Should go to account page on login", () => {
		const navigation = { navigate: () => {} };
		render(<LoginScreen />);
		screen.getAllByText(/log in/i);

		const loginBtn = screen.getByTestId("loginBtn");

		fireEvent.press(loginBtn);
	});
});
