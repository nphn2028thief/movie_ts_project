import { UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";

interface IErrorsDetail {
  [x: string]: { id: string; message: string }[];
}

interface IErrors {
  id: string;
  message: string;
  statusCode: number;
  errors: IErrorsDetail;
  detail?: string;
}

export const toastMessage = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message || "Lỗi hệ thống"),
  custom: (content: JSX.Element) => toast.custom(content),
  setErrors: (error: IErrors, setError?: UseFormSetError<any>) => {
    toast.error(error.message || "Lỗi hệ thống");

    for (const key in error.errors) {
      for (const err of error.errors[key]) {
        if (!setError) return;
        setError(key, { message: err.message });
      }
    }
  },
};
