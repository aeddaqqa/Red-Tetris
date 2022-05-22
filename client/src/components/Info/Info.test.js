import Info from "./Info";
import renderer from "react-test-renderer";

test("test Info", () => {
    const tree = renderer
        .create(
            <Info
                nextStage={[
                    [0, "clear"],
                    [0, "clear"],
                    [0, "clear"],
                ]}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
