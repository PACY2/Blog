import React from "react";
import { SiSpinrilla } from "react-icons/si";

const Loading = (props) => {
  return (
    <section
      className="flex w-full items-center text-primary h-screen justify-center"
      {...props}
    >
      <SiSpinrilla className="animate-spin  w-16 h-16" />
    </section>
  );
};

export default Loading;
