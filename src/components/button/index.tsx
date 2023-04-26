import { Button as MuiButton } from "@mui/material";

interface IProps {
  title: string;
  width?: string;
  isMobile?: boolean;
  icon?: JSX.Element;
  onClick: () => void;
}

export default function Button(props: IProps) {
  const { title, width, isMobile, icon, onClick } = props;

  return (
    <MuiButton
      variant="contained"
      sx={{
        display: {
          xs: isMobile ? "flex" : "none",
          sm: isMobile ? "none" : "flex",
        },
        width: width ? width : "auto",
      }}
      onClick={onClick}
      startIcon={icon && icon}
    >
      {title}
    </MuiButton>
  );
}
