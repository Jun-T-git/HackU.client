import "~/styles/style.css";
import { AppProps } from "next/app";
import { ReactElement } from "react";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <main>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </main>
    </>
  );
};

export default MyApp;
