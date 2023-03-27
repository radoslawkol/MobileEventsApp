import { render, screen } from "@testing-library/react-native";
import AccountScreen from "../AccountScreen";

describe("Account Screen", () => {
	test("Renders correctly", async () => {
		render(<AccountScreen />);

		const headingElement = screen.getByText(/Welcome/i);
		expect(headingElement).toBeOnTheScreen();

		const subHeading = screen.getByText(
			"Have a nice time in our app. We hope you like it."
		);
		expect(subHeading).toBeOnTheScreen();

		const email = screen.getByText("test@gmail.com");
		expect(email).toBeOnTheScreen();

		const since = screen.getByText("02.03.2022");
		expect(since).toBeOnTheScreen();
	});
});
