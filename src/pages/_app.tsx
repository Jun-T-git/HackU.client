import "~/styles/style.css";
import { AppProps } from "next/app";
import { ReactElement } from "react";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <main className="min-h-screen bg-[#222222]">
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </main>
    </>
  );
};

export default MyApp;
