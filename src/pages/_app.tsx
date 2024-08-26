import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "@/layout";
import { ReactNode } from "react";
import type { NextComponentType } from "next";
import { Provider } from "react-redux";
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout =
    Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          {getLayout(<Component {...pageProps} />)}
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
