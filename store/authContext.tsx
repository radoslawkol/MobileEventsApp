import { createContext, useReducer } from "react";

interface AuthCtx {
	user: {
		firstName: string;
		email: string;
		followed: number;
	};
	token: string;
}

interface IProps {
	children: JSX.Element[] | JSX.Element;
}

export const AuthContext = createContext<AuthCtx | null>({
	user: {
		firstName: "",
		email: "",
		followed: 0,
	},
	token: "",
});

export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return (state = action.payload);
		case "LOGOUT":
			return (state = null);
		default:
			return state;
	}
};
