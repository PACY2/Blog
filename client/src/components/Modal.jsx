import React from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Modal = ({ isOpen, children, className = "" }) => {
  const container = useRef(null);
  const box = useRef(null);
  const [ctx] = useState(gsap.context(() => {}));

  useLayoutEffect(() => {
    ctx.add(() => {
      gsap.to(container.current, { duration: 0.2, opacity: 1 });
    });

    ctx.add("remove", () => {
      gsap.to(container.current, {
        duration: 0.2,
        opacity: 0,
        onComplete: () => onClose(),
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={container}
      className={
        "fixed top-0 left-0 w-full h-full z-50 opacity-0 bg-midtransparent-black-background backdrop-blur-md flex justify-center items-center px-4 lg:mx-0 "
      }
    >
      <div
        ref={box}
        className={
          "bg-background rounded w-full h-full max-w-lg  shadow-md " + className
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
