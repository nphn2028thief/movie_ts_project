import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./global_styles.css";

export default function GlobalStyles() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
