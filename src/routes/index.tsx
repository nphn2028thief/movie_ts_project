import { Fragment, Suspense } from "react";
import { Route, Routes as Router } from "react-router-dom";
import Loading from "../components/loading";
import { CRouteList } from "../constants/route_list";
import GlobalStyles from "./global_styles";

export default function Routes() {
  return (
    <GlobalStyles>
      <Router>
        {CRouteList.map((item) => {
          const Page = item.page;
          const Layout = item.layout ? item.layout : Fragment;

          return (
            <Route
              key={item.id}
              path={item.path}
              element={
                <Layout>
                  <Suspense fallback={<Loading />}>
                    <Page />
                  </Suspense>
                </Layout>
              }
            />
          );
        })}
      </Router>
    </GlobalStyles>
  );
}
