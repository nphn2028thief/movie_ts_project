import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "../../../redux_store";
import { register } from "../../../redux_store/auth/auth_actions";
import { ETYPE, IRegisterInfo } from "../../../types/auth";
import { toastMessage } from "../../../utils/toast";
import FormInput from "../../hook_form/form_input";
import { setType } from "../../../redux_store/modal/modal_slice";
import { useIsRequestPending } from "../../../hooks/use_status";

interface IProps {
  handleSwitchModalType: () => void;
}

const schema = yup.object({
  username: yup.string().required("Please enter this field!"),
  password: yup.string().required("Please enter this field!"),
  firstName: yup.string().required("Please enter this field!"),
  lastName: yup.string().required("Please enter this field!"),
});

export default function RegisterForm(props: IProps) {
  const { handleSwitchModalType } = props;

  const inputUsernameRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const isLoadingRegister = useIsRequestPending("auth", "register");

  const { control, handleSubmit } = useForm<IRegisterInfo>({
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IRegisterInfo) => {
    dispatch(register(data))
      .unwrap()
      .then((res) => {
        toastMessage.success(res.message);
        dispatch(setType(ETYPE.login));
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
        />
        <FormInput
          control={control}
          name="firstName"
          label="First Name"
          variant="standard"
          size="medium"
        />
        <FormInput
          control={control}
          name="lastName"
          label="Last Name"
          variant="standard"
          size="medium"
        />
        <FormInput
          control={control}
          name="password"
          label="Password"
          type="password"
          variant="standard"
          size="medium"
        />
      </Stack>

      <LoadingButton
        variant="contained"
        sx={{ width: "100%", marginTop: 5 }}
        type="submit"
        loading={isLoadingRegister}
      >
        Register
      </LoadingButton>

      <Button
        variant="text"
        sx={{ width: "100%", marginTop: 2 }}
        onClick={() => handleSwitchModalType()}
      >
        Log In
      </Button>
    </Box>
  );
}
