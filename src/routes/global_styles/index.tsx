import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./global_styles.css";
import { useAppDispatch } from "../../redux_store";
import { setAppState } from "../../redux_store/app/app_slice";

interface IProps {
  state?: string;
  children: JSX.Element;
}

export default function GlobalStyles(props: IProps) {
  const { state, children } = props;

  const location = useLocation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    // state && dispatch(setAppState(state));
  }, [location]);

  return children;
}
