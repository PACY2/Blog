import { toast } from "react-toastify";

export const success_notif = (value) => {
  toast(value, {
    className: "bg-success text-pure-white [&>button]:my-auto ",
  });
};

export const danger_notif = (value) => {
  toast(value, {
    className: "bg-danger text-pure-white [&>button]:my-auto ",
  });
};

export const info_notif = (value) => {
  toast(value, {
    className: "bg-info text-pure-white [&>button]:my-auto ",
  });
};
