import { useForm } from "react-hook-form";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "components/UserContext";
import styled from "styled-components";
import Button from "components/Button";
import Link from "next/link";
import SupportForm from "components/Support";
import { db, getData, updateData, writeData } from "utils/firebase";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { arrayUnion, doc } from "@firebase/firestore";

export default function Support() {
  const [reqs, setReqs] = useState([]);
  const { user } = useContext(UserContext);
  const { register, watch, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    const datetime = Date.now();
    const reqId = uuidv4();
    if (!user) return false;
    const uid = doc(db, "users", user.uid);
    writeData("support", reqId, {
      questions: [{ text: data.question, isAdmin: false, date: datetime }],
      uid,
    }).then(() => {
      updateData("users", user?.uid, {
        requests: arrayUnion(reqId),
      }).then(() => router.reload());
    });
  };

  useEffect(() => {
    if (user) {
      async function getReqs() {
        const userD = await getData("users", user.uid);
        if (!userD) return false;
        const prereqsData = userD.requests;
        let reqsData = [];
        if (!prereqsData) return false;
        for (const iterator of prereqsData) {
          let elem = await getOneReq(iterator);
          elem.id = iterator;
          reqsData.push(elem);
        }
        reqsData.sort((a, b) =>
          a.questions[a.questions.length - 1].date <
          b.questions[b.questions.length - 1].date
            ? 1
            : -1
        );
        setReqs(reqsData);
        console.log(reqsData);
      }
      getReqs();
    }
  }, [user]);

  const getOneReq = async (id) => {
    return await getData("support", id);
  };

  return (
    <Container>
      <SupportForm>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            rows="8"
            placeholder="Ваш вопрос"
            {...register("question", { required: true })}
          ></textarea>
          <Button type="submit">Отправить вопрос</Button>
        </form>
        {reqs.length > 0 ? (
          <>
            <h2 style={{ marginTop: 24 }}>Мои вопросы</h2>
            <Questions>
              {reqs.map((oneReq, idx) => (
                <Link href={`/support/${oneReq.id}`} key={idx}>
                  <a>
                    <Question key={idx}>
                      <h3>{oneReq.questions[0].text}</h3>
                      <div className="waiting">Ждет ответа..</div>
                    </Question>
                  </a>
                </Link>
              ))}
            </Questions>
          </>
        ) : (
          <></>
        )}
      </SupportForm>
    </Container>
  );
}

const Container = styled.div`
  background-image: url(/images/courtsbg.jpg);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  @media screen and (max-width: 650px) {
    min-height: auto;
  }
  form {
    @media screen and (max-width: 650px) {
      flex-direction: column;
      textarea {
        width: 100%;
        margin-bottom: 6px;
      }
    }
  }
`;

const Questions = styled.div`
  margin: 24px 0 0;
`;

const Question = styled.div`
  margin: 24px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .waiting {
    color: ${(props) => props.theme.text.secondary};
  }
`;
