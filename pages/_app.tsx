import { AppProps } from "next/app";
import "../styles/globals.css";
import "antd/dist/antd.css";
import 'draft-js/dist/Draft.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
