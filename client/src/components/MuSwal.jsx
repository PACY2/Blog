import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default MySwal.mixin({
  customClass: {
    popup: "bg-background text-white",
    confirmButton: "py-1 rounded mx-3 px-2 bg-success",
    cancelButton: "py-1 rounded mx-3 px-2 bg-danger",
    validationMessage: "bg-background text-white",
    input:
      "border-2 outline-none border-background bg-dark-background focus:border-primary shadow-none",
  },
  buttonsStyling: false,
});
