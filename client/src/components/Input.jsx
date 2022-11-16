import React from "react";

const Input = (props) => {
  return (
    <div
      id={props.id ?? null}
      className="border-dark-background rounded focus:border-primary bg-dark-background border-2 flex items-center"
    >
      <input
        onChange={props.onChange ?? null}
        placeholder={`${props.placeholder ? props.placeholder + "..." : ""}`}
        className={`
        w-full
        bg-transparent
        outline-none 
        border-none
        p-3 
        ${props.className ?? ""}
      `}
        type={props.type ?? "text"}
        name={props.name ?? null}
      />
      <div className="w-12 text-xl h-12 flex justify-center items-center">
        {props.icon ?? null}
      </div>
    </div>
  );
};

export default Input;
