import { Button as MuiButton } from "@mui/material";

interface IProps {
  title: string;
  width?: string;
  icon?: JSX.Element;
  onClick: () => void;
}

export default function Button(props: IProps) {
  const { title, width, icon, onClick } = props;

  return (
    <MuiButton
      variant="contained"
      sx={{
        width: width
          ? width
          : {
              xs: "100%",
              sm: "fit-content",
            },
      }}
      onClick={onClick}
      startIcon={icon && icon}
    >
      {title}
    </MuiButton>
  );
}
