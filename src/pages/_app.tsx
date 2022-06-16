import "~/styles/style.css";
import { AppProps } from "next/app";
import { ReactElement } from "react";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <main className="inset-0 min-h-screen bg-gray-200">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
