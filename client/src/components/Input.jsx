import { useState } from "react";

const Input = (props) => {
  const [focuesd, set_focuesd] = useState(false);

  return (
    <div
      id={props.id ?? null}
      className={`border-dark-background rounded ${
        focuesd && "border-primary"
      } bg-dark-background border-2  ${props.className ?? ""}`}
    >
      <div className="flex items-center">
        <input
          onFocus={() => set_focuesd(true)}
          onBlur={(event) => {
            set_focuesd(false);
            props.onBlur && props.onBlur(event);
          }}
          onChange={props.onChange ?? null}
          placeholder={`${props.placeholder ? props.placeholder + "..." : ""}`}
          className={` w-full bg-transparent outline-none  border-none p-3`}
          type={props.type ?? "text"}
          name={props.name ?? null}
        />
        {props.icon && (
          <div className="w-12 text-xl h-12 flex justify-center items-center">
            {props.icon}
          </div>
        )}
      </div>
      {props.errors && (
        <div className="py-1 px-2 text-sm text-primary"> {props.errors} </div>
      )}
    </div>
  );
};

export default Input;
