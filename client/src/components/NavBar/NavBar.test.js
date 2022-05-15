import { render, screen } from "@testing-library/react";
import Navbar from "./NavBar";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";

const mockStore = configureStore();

describe("Navbar", () => {
    let store;
    store = mockStore({});
    let user = { avatar: "Agoumi.png", userName: "bigola" };
    render(
        <Provider store={store}>
            <Navbar user={user} />
        </Provider>
    );
    test("avatar", () => {
        const avatar = screen.getByRole("img");
        const userName = screen.getByText("bigola");
        expect(avatar.src).toBe("http://localhost/Agoumi.png");
        expect(userName).toBeInTheDocument();
    });
});
