import AppContainer from "components/AppContainer";
import { UserProvider } from "components/UserContext";
import { ThemeProvider } from "styled-components";
import "styles/global.scss";
import { darkTheme } from "styles/Theme";
import NextNProgress from "nextjs-progressbar";

function App({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#004CFF" />
      <ThemeProvider theme={darkTheme}>
        <UserProvider>
          <AppContainer>
            <Component {...pageProps} />
          </AppContainer>
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
