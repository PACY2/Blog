import React from "react";
import { SiSpinrilla } from "react-icons/si";

const Loading = () => {
  return (
    <section className="flex w-full items-center text-primary  justify-center">
      <SiSpinrilla className="animate-spin  w-16 h-16" />
    </section>
  );
};

export default Loading;
