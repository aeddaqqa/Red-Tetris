import { render, screen } from "@testing-library/react";
import App from "./App";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { socketMiddleware } from "./store/middleware";
import { Provider } from "react-redux";

const middlewares = [socketMiddleware, thunk];
const mockStore = configureStore(middlewares);

test("renders learn react link", () => {
    // let store;
    // store = mockStore({
    //     connection: {
    //         connected: true,
    //         connecting: true,
    //     },
    //     player: {
    //         userName: null,
    //         roomName: null,
    //         avatar: null,
    //         error: null,
    //         roomError: null,
    //         loading: false,
    //         chat: [],
    //     },
    // });
    // render(
    //     <Provider store={store}>
    //         <App />
    //     </Provider>
    // );
    // screen.debug();
});
