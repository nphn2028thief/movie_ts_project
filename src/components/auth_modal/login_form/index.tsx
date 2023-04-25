import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useIsRequestPending } from "../../../hooks/use_status";
import { useAppDispatch } from "../../../redux_store";
import { getMe, login } from "../../../redux_store/auth/auth_actions";
import { setModalIsOpen } from "../../../redux_store/modal/modal_slice";
import { ILoginInfo } from "../../../types/auth";
import { toastMessage } from "../../../utils/toast";
import FormInput from "../../hook_form/form_input";

interface IProps {
  handleSwitchModalType: () => void;
}

const schema = yup.object({
  username: yup.string().required("Please enter this field!"),
  password: yup.string().required("Please enter this field!"),
});

export default function LoginForm(props: IProps) {
  const { handleSwitchModalType } = props;

  const inputUsernameRef = useRef<HTMLInputElement>(null);

  const isLoadingLogin = useIsRequestPending("auth", "login");

  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<ILoginInfo>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ILoginInfo) => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        dispatch(setModalIsOpen(false));
        // dispatch(getMe());
        toastMessage.success("Login Successfully!");
      })
      .catch((error) => {
        toastMessage.error(error.message || "System is error!");
        if (inputUsernameRef.current) {
          inputUsernameRef.current.focus();
        }
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormInput
          ref={inputUsernameRef}
          control={control}
          name="username"
          label="Username"
          variant="standard"
          size="medium"
          disabled={isLoadingLogin}
        />
        <FormInput
          control={control}
          name="password"
          label="Password"
          type="password"
          variant="standard"
          size="medium"
          disabled={isLoadingLogin}
        />
      </Stack>

      <LoadingButton
        variant="contained"
        sx={{ width: "100%", marginTop: 5 }}
        type="submit"
        loading={isLoadingLogin}
      >
        Log In
      </LoadingButton>

      <Button
        variant="text"
        sx={{ width: "100%", marginTop: 2 }}
        onClick={() => handleSwitchModalType()}
        disabled={isLoadingLogin}
      >
        Register
      </Button>
    </Box>
  );
}
