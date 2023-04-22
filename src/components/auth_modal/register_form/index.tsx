import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ETYPE, IRegisterInfo } from "../../../types/auth";
import FormInput from "../../hook_form/form_input";

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

  // const isLoadingRegister = useIsRequestPending("auth", register)

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
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormInput
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
        // loading={isLoadingLogin}
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
