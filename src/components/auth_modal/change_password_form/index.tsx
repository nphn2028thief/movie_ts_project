import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useIsRequestPending } from "../../../hooks/use_status";
import { useAppDispatch } from "../../../redux_store";
import { changePassword } from "../../../redux_store/auth/auth_actions";
import { logout } from "../../../redux_store/auth/auth_slice";
import {
  resetType,
  setModalIsOpen,
  setType,
} from "../../../redux_store/modal/modal_slice";
import { ETYPE, IUpdatePassword } from "../../../types/auth";
import { toastMessage } from "../../../utils/toast";
import FormInput from "../../hook_form/form_input";

const schema = yup.object({
  password: yup.string().required("Please enter this field!"),
  newPassword: yup.string().required("Please enter this field!"),
  confirmNewPassword: yup.string().required("Please enter this field!"),
});

export default function ChangePasswordForm() {
  const { control, handleSubmit } = useForm<IUpdatePassword>({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const isLoading = useIsRequestPending("auth", "changePassword");

  const onSubmit = (data: IUpdatePassword) => {
    dispatch(changePassword(data))
      .unwrap()
      .then((res) => {
        toastMessage.success(res.message || "Change password successfully!");
        dispatch(setModalIsOpen(false));
        dispatch(logout());
        dispatch(resetType());
      })
      .catch((error) =>
        toastMessage.error(error.message || "Change password failed!")
      );
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormInput
          control={control}
          name="password"
          label="Password"
          type="password"
          variant="standard"
          size="medium"
          disabled={isLoading}
        />
        <FormInput
          control={control}
          name="newPassword"
          label="New Password"
          type="password"
          variant="standard"
          size="medium"
          disabled={isLoading}
        />

        <FormInput
          control={control}
          name="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          variant="standard"
          size="medium"
          disabled={isLoading}
        />
      </Stack>

      <LoadingButton
        variant="contained"
        sx={{ width: "100%", marginTop: 5 }}
        type="submit"
        loading={isLoading}
      >
        Change
      </LoadingButton>
    </Box>
  );
}
