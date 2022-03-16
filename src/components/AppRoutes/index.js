import { Route, Routes } from "react-router-dom";
import ErrorPage from "../../pages/error";
import FilmsPage from "../../pages/films";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<FilmsPage />} />
      <Route
        path="*"
        element={
          <ErrorPage>
            <h1>404 Not Found</h1>
          </ErrorPage>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
