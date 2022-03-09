import styled from "styled-components";

const StyledChat = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`;

const Chat = () => {
  return (
    <StyledChat>
      <h2>chat</h2>
      <div className="user"></div>
      <div className="other-users"></div>
      <div className="chat-box"></div>
    </StyledChat>
  );
};

export default Chat;
