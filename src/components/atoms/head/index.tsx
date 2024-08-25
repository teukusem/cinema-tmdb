import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title>{title ? title + " | " : null} CINEMA</title>
    </Helmet>
  );
};
export default Head;
