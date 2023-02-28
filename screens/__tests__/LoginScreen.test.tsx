import LoginScreen from "../LoginScreen";
import {
	render,
	screen,
	fireEvent,
	waitFor,
} from "@testing-library/react-native";
import { act } from "react-test-renderer";
describe("Login Screen", () => {
	const navigation = { navigate: (name: string) => {} };

	test("Renders correctly", () => {
		render(<LoginScreen navigation={navigation} />);

		const headingElement = screen.getByText("Log In");
		expect(headingElement).toBeOnTheScreen();

		const emailInput = screen.getByTestId("emailInput");
		expect(emailInput).toBeOnTheScreen();

		const passwordInput = screen.getByTestId("passwordInput");
		expect(passwordInput).toBeOnTheScreen();

		const submitButton = screen.getByTestId("loginBtn");
		expect(submitButton).toBeOnTheScreen();
	});

	test("Show error messages if inputs are empty and form submitted", async () => {
		render(<LoginScreen navigation={navigation} />);

		const submitButton = screen.getByTestId("loginBtn");
		await fireEvent.press(submitButton);

		await waitFor(() => {
			expect(screen.getByText("Email is required.")).toBeOnTheScreen();
			expect(screen.getByText("Password is required.")).toBeOnTheScreen();
		});
	});

	test("Show error if email input is invalid", async () => {
		render(<LoginScreen navigation={navigation} />);

		const emailInput = screen.getByTestId("emailInput");
		await fireEvent.changeText(emailInput, "adsad@");

		const submitButton = screen.getByTestId("loginBtn");
		await fireEvent.press(submitButton);

		await waitFor(() => {
			expect(screen.getByText("Email has to be valid.")).toBeOnTheScreen();
		});
	});

	test("Show error if password is longer than 20 characters", async () => {
		render(<LoginScreen navigation={navigation} />);

		const passwordInput = screen.getByTestId("passwordInput");

		await fireEvent.changeText(passwordInput, "231321adasda395392159");

		const submitButton = screen.getByTestId("loginBtn");
		await fireEvent.press(submitButton);

		await waitFor(() => {
			expect(
				screen.getByText("Password is not valid. Max 20 characters.")
			).toBeOnTheScreen();
		});
	});

	test("Show error if password is shorter than 6 characters", async () => {
		render(<LoginScreen navigation={navigation} />);

		const passwordInput = screen.getByTestId("passwordInput");

		await fireEvent.changeText(passwordInput, "23asd");

		const submitButton = screen.getByTestId("loginBtn");
		await fireEvent.press(submitButton);

		await waitFor(() => {
			expect(
				screen.getByText("Password is not valid. Min 6 characters.")
			).toBeOnTheScreen();
		});
	});
});
