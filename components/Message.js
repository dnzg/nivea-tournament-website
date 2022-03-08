import styled from "styled-components";

const toDate = (dat1e) => {
  const date = "December 5, 2021 at 7:18:57";
  const newDate = new Date(date);
  const m = newDate.getMonth() + 1;
  const min = (newDate.getMinutes() < 10 ? "0" : "") + newDate.getMinutes();
  return (
    newDate.getDate() +
    "/" +
    m +
    "/" +
    newDate.getFullYear() +
    ", " +
    newDate.getHours() +
    ":" +
    min
  );
};

export default function Message({ isModerator, author, img, text, date }) {
  return (
    <MessageContainer>
      <Avatar src={img} />
      <div>
        <h3>{author}</h3>
        {text}
        <br />
        {date?<span>{toDate(date.seconds)}</span>:<></>}
      </div>
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  margin: 0 0 20px;
  span {
    display: block;
    margin: 6px 0 0;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 64px;
  margin-right: 12px;
  object-fit: cover;
  object-position: center;
`;
