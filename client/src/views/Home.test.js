import { render } from "@testing-library/react";
import Home from "./Home";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
describe("Home", () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            myState: "sample text",
        });
    });

    test("input should be empty", () => {
        <Provider store={store}>
            render(
            <Home />
            );
        </Provider>;
    });
});
