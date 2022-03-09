import styled from "styled-components";

const StyledChat = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
  h2 {
    width: 100%;
    padding: 1rem;
    text-align: center;
    background-color: #f5f5f5;
  }
  .user {
    width: 100%;
    padding: 1rem;
    text-align: center;
    background-color: #f55;
  }
  .other-users {
    padding: 0.5rem;
    display: flex;
    background-color: #f5f5f5;
    &-user {
      flex: 1;
      background-color: #f55aaa;
      padding: 1rem;
      text-align: center;
    }
  }
  .chat-box {
    width: 100%;
    padding: 1rem;
  }
`;

const Chat = () => {
  return (
    <StyledChat>
      <h2>chat</h2>
      <div className="user">farwila</div>
      <div className="other-users">
        <div className="other-users-user">user</div>
        <div className="other-users-user">user</div>
        <div className="other-users-user">user</div>
        <div className="other-users-user">user</div>
      </div>
      <div className="chat-box">
        <p>ello</p>
      </div>
    </StyledChat>
  );
};

export default Chat;
