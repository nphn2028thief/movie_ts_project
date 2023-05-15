import { useEffect, useRef } from "react";

const usePrevious = (value: string) => {
  const ref = useRef<string>();

  useEffect(() => {
    ref.current = value;
  }, [value]);
};

export default usePrevious;
