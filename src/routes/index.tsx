import { Suspense } from "react";
import { Route, Routes as Router } from "react-router-dom";
import Loading from "../components/loading";
import menuConfigs from "../configs/menu_configs";
import DefaultLayout from "../layouts/default_layout";
import GlobalStyles from "./global_styles";

export default function Routes() {
  return (
    <Router>
      <Route path="/" element={<DefaultLayout />}>
        {menuConfigs.routes.map((item) => {
          const Page = item.page;

          return (
            <Route
              key={item.id}
              path={item.path}
              element={
                <Suspense fallback={<Loading />}>
                  <GlobalStyles state={item.state}>
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
