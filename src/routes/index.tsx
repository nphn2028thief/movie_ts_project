import { Fragment, Suspense } from "react";
import { Route, Routes as Router } from "react-router-dom";
import Loading from "../components/loading";
import { CRouteList } from "../constants/route_list";
import GlobalStyles from "./global_styles";
import DefaultLayout from "../layouts/default_layout";

export default function Routes() {
  return (
    <Router>
      <Route path="/" element={<DefaultLayout />}>
        {CRouteList.map((item) => {
          const Page = item.page;
          const Layout = item.layout ? item.layout : Fragment;

          return (
            <Route
              key={item.id}
              path={item.path}
              element={
                <Suspense fallback={<Loading />}>
                  <GlobalStyles>
                    <Page />
                  </GlobalStyles>
                </Suspense>
              }
            />
          );
        })}
      </Route>
    </Router>
  );
}
