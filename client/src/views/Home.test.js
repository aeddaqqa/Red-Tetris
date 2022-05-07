import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { socketMiddleware } from "../store/middleware";

const middlewares = [socketMiddleware, thunk];
const mockStore = configureStore(middlewares);
describe("Home", () => {
    let store;
    test("input should be empty", () => {
        store = mockStore({
            connection: {
                connected: true,
                connecting: true,
            },
            player: {
                userName: null,
                roomName: null,
                avatar: null,
                error: null,
                roomError: null,
                loading: false,
                chat: [],
            },
        });
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );
        screen.debug();
    });
});
