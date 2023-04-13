import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./global_styles.css";

interface IProps {
  children: JSX.Element;
}

export default function GlobalStyles(props: IProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return props.children;
}
