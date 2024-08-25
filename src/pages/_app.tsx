import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "@/layout";
import { ReactNode } from "react";
import type { NextComponentType } from "next";
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app";

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout =
    Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);

  return (
    <NextUIProvider>{getLayout(<Component {...pageProps} />)}</NextUIProvider>
  );
};

export default App;
