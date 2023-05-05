import { Button } from "@mui/material";

interface IProps {
  onClick: () => void;
}

export default function TryAgainButton(props: IProps) {
  const { onClick } = props;

  return (
    <Button variant="contained" sx={{ width: "fit-content" }} onClick={onClick}>
      Try Again
    </Button>
  );
}
