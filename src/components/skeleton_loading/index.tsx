import { Skeleton } from "@mui/material";

interface IProps {
  variant?: "circular" | "rectangular" | "rounded" | "text";
  length: number;
  width: any;
  height: any;
}

export default function SkeletonLoading(props: IProps) {
  const { variant = "rectangular", length, width, height } = props;

  return (
    <>
      {Array.from({ length: length }, (_, index) => {
        return (
          <Skeleton
            key={index}
            variant={variant}
            sx={{
              width,
              height,
            }}
          />
        );
      })}
    </>
  );
}
