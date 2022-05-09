import reducer from "./playerSlice";
import {
    addPlayerRequest,
    addPlayerSuccess,
    addPlayerFail,
} from "./playerSlice";

describe("test connection slice", () => {
    let initialValue = {
        userName: null,
        roomName: null,
        avatar: null,
        error: null,
        roomError: null,
        loading: false,
        chat: [],
    };
    let player = { id: 0, name: "Agoumi", ImagePng: "Agoumi.png" };
    test("should return the initial value", () => {
        expect(reducer(undefined, {})).toEqual(initialValue);
    });
    test("add player request", () => {
        expect(reducer(initialValue, addPlayerRequest())).toEqual({
            ...initialValue,
            loading: true,
        });
    });
    test("add player success", () => {
        expect(
            reducer(
                { ...initialValue, loading: true },
                addPlayerSuccess({ username: "farwila", avatar: player })
            )
        ).toEqual({
            ...initialValue,
            loading: false,
            userName: "farwila",
            avatar: player,
        });
    });
    test("add player failed", () => {
        expect(
            reducer(
                { ...initialValue, loading: true },
                addPlayerFail({ ...initialValue, error: "user existe" })
            )
        ).toEqual({
            ...initialValue,
            loading: false,
            error: "user existe",
        });
    });
});

// {id:0,name:'Agoumi',ImagePng:'Agoumi.png'}