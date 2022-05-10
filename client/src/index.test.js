import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

describe("render app", () => {
    test("render app", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });
    test("render home", () => {
        screen.getByText("");
    });
});
