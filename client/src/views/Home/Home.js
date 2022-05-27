import { useEffect, useState } from "react";
import { StyledContainer, LeftSide, RightSide } from "./Home.style";
import { useSelector, useDispatch } from "react-redux";
import { StyledStartButton1 } from "../../components/StartButton/StartButton.style";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Popover } from "antd";
import { startConnecting } from "../../store/slices/connectionSlice";
import { addPlayerRequest } from "../../store/slices/playerSlice";

const Avatars = [
    { id: 0, name: "Agoumi", ImagePng: "Agoumi.png" },
    { id: 1, name: "Binx_Bond", ImagePng: "Binx_Bond.png" },
    { id: 2, name: "Cosmo_Blue", ImagePng: "Cosmo_Blue.png" },
    { id: 3, name: "Cute_Cowboy", ImagePng: "Cute_Cowboy.png" },
    { id: 4, name: "Pechorin_Bloom", ImagePng: "Pechorin_Bloom.png" },
    { id: 5, name: "ChingChang", ImagePng: "ChingChang.png" },
    { id: 6, name: "Gawri", ImagePng: "Gawri.png" },
    { id: 7, name: "Gadouma", ImagePng: "Gadouma.png" },
    { id: 8, name: "Morty", ImagePng: "Morty.png" },
    { id: 9, name: "Rhett_James", ImagePng: "Rhett_James.png" },
];

const Home = () => {
    const [userName, setUserName] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const dispatch = useDispatch();
    var [avatar, setAvatar] = useState(Avatars[Math.floor(Math.random() * 10)]);

    const addUsername = () => {
        userName.trim();
        const regex = /^[a-zA-Z0-9]{4,16}$/;
        if (regex.test(userName)) {
            dispatch(
                addPlayerRequest({
                    username: userName,
                    avatar: avatar.ImagePng,
                })
            );
        } else {
            setErrorUsername(
                "username must be only alphanumerique between 4 and 16 characters"
            );
        }
    };
    const ChangeAvatar = (data) => {
        var Id = data.id;
        if (Id < 9) setAvatar(Avatars[Id + 1]);
        else if (Id === 9) setAvatar(Avatars[0]);
    };

    const { player } = useSelector((state) => state);
    useEffect(() => {
        if (player.error) toast(player.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }, [player]);
    return (
        <StyledContainer>
            <ToastContainer />
            <RightSide>
                <div className="title">
                    <span style={{ color: "#f9253c" }}>Red</span>
                    <span style={{ color: "white" }}>Tetris</span>
                </div>
                <form
                    className="form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        addUsername();
                        setUserName("");
                    }}
                >
                    <span
                        title="changeAvatar"
                        className="w-52 h-52 relative mb-4"
                        onClick={() => ChangeAvatar(avatar)}
                    >
                        <Popover
                            placement="left"
                            content={"Click here to change your Avatar"}
                        >
                            <div className="group w-full h-full rounded-full overflow-hidden shadow-inner text-center  table cursor-pointer">
                                <img
                                    src={require("../../images/Avatars/" +
                                        avatar.ImagePng)}
                                    alt="Avatar"
                                    className="object-cover object-center w-full h-full"
                                />
                            </div>
                        </Popover>
                    </span>
                    <input
                        className={
                            "input mx-auto bg-transparent rounded py-4 px-4 mb-3 focus:outline-none"
                        }
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => {
                            //console.log("changed");
                            setUserName(e.target.value);
                        }}
                        style={{ fontFamily: "Pixel", border: "1px solid #f9253c", color: "whitesmoke" }}
                    />
                    <StyledStartButton1>play</StyledStartButton1>
                    {errorUsername && (
                        <span
                            title="errorMessage"
                            style={{
                                fontSize: "20px",
                                color: "#f9253c",
                                fontFamily: "'Saira', sans-serif",
                            }}
                        >
                            {errorUsername}
                        </span>
                    )}
                </form>
            </RightSide>
            <LeftSide />
        </StyledContainer>
    );
};

export default Home;
