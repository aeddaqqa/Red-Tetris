import styled from "styled-components";
import UserCard from "../UserCard";
import Avatar from "../UserAvatar";
import { useRef, useEffect } from "react";

const StyledMsgs = styled.div`
    width: 100%;
    height: 100%;
    // max-height: 555px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .input {
        width: 100%;
        height: 60px;
        background-color: white;
        display: flex;
    }
`;

const StyledMessage = styled.div`
    width: 100%;
    /* flex: 1; */
    /* padding: 1rem; */
    /* height: ; */
    display: flex;
    flex-direction: ${(props) => {
        if (props.type === 0) return "row-reverse";
        return "row";
    }};
    padding: 1rem;
    gap: 1rem;

    .content {
        min-height: 60px;
        /* padding: 1rem; */
        display: flex;
        gap: 0.5rem;
        flex-direction: column;
        .username {
            text-align: ${(props) => {
                if (props.type !== 0) return "start";
                return "end";
            }};
            font-size: 0.9rem;
            font-weight: lighter;
            color: white;
            line-height: 1.5;
            letter-spacing: 2px;

            /* padding: 1rem 0; */
        }
        .message {
            padding: 1rem;
            border-radius: 10px;
            background-color: white;
            /* margin-top: 20px; */
            font-size: ${(props) => props.theme.message.fontSize};
            font-family: ${(props) => props.theme.message.font};
            /* font-weight: ${(props) => props.theme.message.fontWeight}; */
            letter-spacing: ${(props) => props.theme.message.letterSpacing};
            color: ${(props) => props.theme.message.color};
            background: ${(props) => props.theme.message.background};
        }
    }
    .avatar {
        gap: 0.6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .cercle {
            color: white;
            justify-content: center;
            align-items: center;
            display: flex;
            border: 2px solid ${(props) => props.theme.border.avatar};
            background-color: ${(props) => props.theme.background.primary};
            border-radius: 50%;
            width: 50px;
            height: 50px;
        }
    }
`;

const Message = ({ sender, message, index, player }) => {
    // //console.log(username, message, index);
    return (
        <StyledMessage type={player.userName === sender.username ? 1 : 0}>
            <div className="avatar">
                <Avatar avatar={sender.avatar} />
                {/* <UserCard player={sender} wala={1} /> */}
            </div>
            <div className="content">
                <div className="username">{sender.username}</div>
                <div className="message">{message}</div>
            </div>
        </StyledMessage>
    );
};

const Messages = ({ player }) => {
    var colors = ["#FFFA4D", "#00ff00", "#5EE6EB", "#F24A72", "#EEEEEE"];
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [player.chat]);

    const generate_color = (index) => {
        return colors[index];
    };

    return (
        <StyledMsgs>
            {player.chat.map((message, index) =>
                message.type === "join" ? (
                    <div
                        className="flex justify-center align-center"
                        key={index}
                    >
                        {" "}
                        <span
                            style={{
                                fontSize: "20px",
                                color: generate_color(index),
                                fontFamily: "'Saira', sans-serif",
                            }}
                        >
                            {message.message}
                        </span>
                    </div>
                ) : (
                    <Message
                        player={player}
                        key={index}
                        index={index}
                        sender={message.sender}
                        message={message.message}
                    />
                )
            )}
            <div ref={messagesEndRef} />
        </StyledMsgs>
    );
};

export default Messages;
