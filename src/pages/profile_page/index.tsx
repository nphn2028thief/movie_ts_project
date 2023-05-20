import { yupResolver } from "@hookform/resolvers/yup";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormInput from "../../components/hook_form/form_input";
import UserAvatar from "../../components/user_avatar";
import { useGetStatus } from "../../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import { updateMe } from "../../redux_store/auth/auth_actions";
import { ETYPE, IUser } from "../../types/auth";
import { toastMessage } from "../../utils/toast";
import Wrapper from "../wrapper";
import {
  resetType,
  setModalIsOpen,
  setType,
} from "../../redux_store/modal/modal_slice";

const schema = yup.object({
  firstName: yup.string().required("Please enter this field!"),
  lastName: yup.string().required("Please enter this field!"),
});

// const blobToBase64 = (blob: Blob): Promise<string> => {
//   return new Promise((resolve, _) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result?.toString() || "");
//     reader.readAsDataURL(blob);
//   });
// };

export default function ProfilePage() {
  const { userInfo } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const [isLoading, isError] = useGetStatus("auth", "updateMe");

  const defaultValues: Pick<IUser, "firstName" | "lastName"> = useMemo(() => {
    return {
      firstName: userInfo?.firstName || "",
      lastName: userInfo?.lastName || "",
    };
  }, [userInfo]);

  const { control, handleSubmit, reset } = useForm<
    Pick<IUser, "firstName" | "lastName">
  >({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userInfo) {
      reset(defaultValues);
    }
  }, [userInfo]);

  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files?.length) {
    //   const image = await blobToBase64(e.target.files[0]);
    //   const data: IUser = {
    //     _id: userInfo?._id as string,
    //     password: userInfo?.password as string,
    //     firstName: userInfo?.firstName as string,
    //     lastName: userInfo?.lastName as string,
    //     image,
    //     favorites: userInfo?.favorites as number[],
    //     reviews: userInfo?.reviews as string[],
    //     createAt: userInfo?.createAt as Date,
    //     updateAt: userInfo?.updateAt as Date,
    //   };
    //   dispatch(updateMe(data))
    //     .unwrap()
    //     .then(() => toastMessage.success("Update Info Success!"))
    //     .catch(() => toastMessage.error("Update Info Failed!"));
    // }
  };

  const onSubmit = (data: Pick<IUser, "firstName" | "lastName">) => {
    dispatch(
      updateMe({
        _id: userInfo?._id as string,
        password: userInfo?.password as string,
        firstName: data.firstName,
        lastName: data.lastName,
        image: userInfo?.image as string,
        favorites: userInfo?.favorites as number[],
        reviews: userInfo?.reviews as string[],
        createAt: userInfo?.createAt as Date,
        updateAt: userInfo?.updateAt as Date,
      })
    )
      .unwrap()
      .then(() => toastMessage.success("Update Info Success!"))
      .catch(() => toastMessage.error("Update Info Failed!"));
    // console.log(data);
  };

  return (
    <Wrapper>
      <Box
        sx={{
          maxWidth: "800px",
          minHeight: {
            xs: "calc(100vh - 56px - 48px)",
            md: "calc(100vh - 64px - 48px)",
          },
          display: "flex",
          alignItems: "center",
          margin: "auto",
          padding: 3,
        }}
      >
        <Box
          display="flex"
          height="fit-content"
          flexDirection={{
            xs: "column",
            sm: "row",
          }}
          flex={1}
        >
          <Stack
            flex="0 0 40%"
            alignItems="center"
            padding={2}
            pr={1}
            sx={{ borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}
          >
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                width: "192px",
                height: "192px",
              }}
              // onMouseOver={() => setIsFocus(true)}
              // onMouseOut={() => setIsFocus(false)}
            >
              <UserAvatar width="100%" height="100%" />
            </Box>
          </Stack>

          <Stack
            flex="0 0 60%"
            padding={2}
            pl={1}
            gap={2}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              control={control}
              name="firstName"
              label="First Name"
              disabled={isLoading}
            />
            <FormInput
              control={control}
              name="lastName"
              label="Last Name"
              disabled={isLoading}
            />

            <Stack direction="row" alignItems="center" gap={2}>
              <Box flex={1}>
                <TextField
                  size="small"
                  type="password"
                  value="*********"
                  label="Password"
                  disabled
                  fullWidth
                />
              </Box>

              <Button
                variant="contained"
                onClick={() => {
                  dispatch(setType(ETYPE.changePassword));
                  dispatch(setModalIsOpen(true));
                }}
              >
                Change
              </Button>
            </Stack>

            <LoadingButton
              type="submit"
              variant="contained"
              startIcon={<Save />}
              sx={{ mt: 2 }}
              loading={isLoading}
            >
              Save
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </Wrapper>
  );
}
