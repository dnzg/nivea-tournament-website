import SupportForm from "components/Support";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Message from "components/Message";
import { getData, updateData } from "utils/firebase";
import UserContext from "components/UserContext";
import { useForm } from "react-hook-form";
import { arrayUnion } from "@firebase/firestore";
import Button from "components/Button";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
// General scroll to element function
export default function Post() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState();
  const { id } = router.query;
  const { register, watch, handleSubmit } = useForm();
  const [qdata, setQdata] = useState();

  const onSubmit = (data) => {
    const datetime = Date.now();
    const reqId = id;

    updateData("support", reqId, {
      questions: arrayUnion({
        text: data.question,
        isAdmin: false,
        date: datetime,
      }),
    }).then(() => {
      router.reload();
    });
  };

  useEffect(() => {
    if (id) {
      async function support() {
        setQdata(await getData("support", id));
      }
      support();
    }
  }, [id]);
  useEffect(() => {
    if (user) {
      async function setData() {
        setUserData(await getData("users", user?.uid));
      }
      setData();
    }
  }, [user]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef) {
      messagesEndRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  useEffect(scrollToBottom, [qdata]);

  return qdata ? (
    <SupportForm title={qdata.questions[0].text}>
      <Messages>
        {qdata.questions.map((message, idx) => (
          <Message
            key={idx}
            isModerator={message.isAdmin}
            author={message.isAdmin ? "Команда поддержки" : userData?.name}
            img={message.isAdmin ? "/images/fav.png" : user.photoURL}
            text={message.text}
            date={message.date}
          />
        ))}

        <div ref={messagesEndRef} />
      </Messages>
      <WriteNew>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            rows="1"
            placeholder="Ваш вопрос"
            {...register("question", { required: true })}
          ></textarea>
          <div className="submit">
            <Button type="submit" style={{ width: "100%" }}>
              Отправить
            </Button>
          </div>
        </form>
      </WriteNew>
    </SupportForm>
  ) : (
    <></>
  );
}

const Messages = styled.div`
  background: ${(props) => props.theme.bg.dark};
  padding: 24px;
  border-radius: 5px;
  height: 400px;
  max-height: 400px;
  min-height: 400px;
  position: relative;
  overflow-y: scroll;
`;

const WriteNew = styled.div`
  padding: 24px 0 0 0;
  background-color: ${(props) => props.theme.bg.darkPrimary};
  form {
    justify-content: space-between;
    display: flex;
    @media screen and (max-width: 650px) {
      flex-direction: column;
      textarea {
        width: 100%;
        margin-bottom: 6px;
      }
      .submit {
        width: 100%;
      }
    }
  }
`;
