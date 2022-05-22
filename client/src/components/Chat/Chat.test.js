//{username: 'farwila', socketId: 'A1v2hWTRPgO3Zu68AAAD', avatar: 'Binx_Bond.png', room: ''}
import renderer from "react-test-renderer";
import Chat from "./Chat";
import { Provider } from "react-redux";
import store from "../../store/index";
describe("Chat", () => {
    test("display chat", () => {
        let players = [
            {
                username: "farwila",
                socketId: "A1v2hWTRPgO3Zu68AAAD",
                avatar: "Binx_Bond.png",
                room: "",
            },
        ];
        let player = {
            avatar: "Gadouma.png",
            userName: "bigola",
            chat: [
                {
                    message: "Player bigola joined the room sadff",
                    type: "join",
                },
                {
                    sender: {
                        username: "farwila",
                        socketId: "A1v2hWTRPgO3Zu68AAAD",
                        avatar: "Binx_Bond.png",
                        room: "",
                    },
                    message: "sdfasdf",
                    type: "message",
                },
            ],
        };
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Chat players={players} player={player} />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
