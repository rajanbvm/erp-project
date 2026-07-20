import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/custom.css";

export default function App({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Component {...pageProps} />
  );
}