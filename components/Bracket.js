import {
  Bracket,
  RoundProps,
  Seed,
  SeedItem,
  SeedTeam,
  RenderSeedProps,
} from "react-brackets";
import styled from "styled-components";

const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not
  console.log(roundIndex);

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Seed
      mobileBreakpoint={breakpoint}
      style={{ fontSize: 12 }}
      className="noafter"
    >
      <SeedItem style={{ background: "none", boxShadow: "none" }}>
        <div>
          <SeedTeam
            style={{
              background:
                seed.teams[0]?.score > seed.teams[1]?.score
                  ? "#000F4B"
                  : "#000",
              borderRadius: 4,
              marginBottom: 8,
              padding: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span style={{ marginLeft: 6 }}>{seed.teams[0]?.name}</span>
              {seed.teams[0]?.score || seed.teams[0]?.score === 0 ? (
                <span
                  style={{
                    background:
                      seed.teams[0]?.score > seed.teams[1]?.score
                        ? "#003CC8"
                        : "#26262B",
                    padding: "6px 12px",
                    width: 32,
                    // margin: "-4px ​-7px -4px 0",
                    borderRadius: "0 4px 4px 0",
                  }}
                >
                  {seed.teams[0]?.score}
                </span>
              ) : (
                <></>
              )}
            </div>
          </SeedTeam>
          <SeedTeam
            style={{
              background:
                seed.teams[0]?.score < seed.teams[1]?.score
                  ? "#000F4B"
                  : "#000",
              borderRadius: 4,
              padding: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span style={{ marginLeft: 6 }}>{seed.teams[1]?.name}</span>
              {seed.teams[1]?.score || seed.teams[1]?.score === 0 ? (
                <span
                  style={{
                    background:
                      seed.teams[0]?.score < seed.teams[1]?.score
                        ? "#003CC8"
                        : "#26262B",
                    padding: "6px 12px",
                    width: 32,
                    // margin: "-4px ​-7px -4px 0",
                    borderRadius: "0 4px 4px 0",
                  }}
                >
                  {seed.teams[1]?.score}
                </span>
              ) : (
                <></>
              )}
            </div>
          </SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

export default function BracketPage({ rounds, title }) {
  return (
    <>
      {rounds ? (
        <>
          <h4
            style={{
              fontWeight: "bold",
              fontSize: 36,
              margin: "48px 0 16px",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Турнирная таблица {title}
          </h4>
          <Wrap>
            <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />
          </Wrap>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

const Wrap = styled.div`
  margin: 0 0 64px;
  width: 90%;
  overflow-x: hidden;
  background: url(/images/bracbg.jpg) no-repeat center;
  background-size: contain;
  min-height: 540px;
  display: flex;
  align-items: center;
  h4 {
    font-weight: bold;
    font-size: 36px;
    margin: 48px 0 16px;
  }
`;
