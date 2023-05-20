import { Avatar } from "@mui/material";
import fallBack from "../../assets/fallback.jpg";
import { useAppSelector } from "../../redux_store";

interface IProps {
  width: string | number;
  height: string | number;
}

export default function UserAvatar(props: IProps) {
  const { width, height } = props;

  const { userInfo } = useAppSelector((state) => state.authSlice);

  return (
    <Avatar
      src={userInfo?.image ? userInfo.image : fallBack}
      alt="avatar"
      sx={{ width, height }}
    />
  );
}
