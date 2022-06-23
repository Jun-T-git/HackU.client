import "~/styles/style.css";
import { AppProps } from "next/app";
import { ReactElement } from "react";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
