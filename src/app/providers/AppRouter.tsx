import { createBrowserRouter } from "react-router-dom";
import App from "@/app/App";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ScenariosPage } from "@/pages/ScenariosPage";
import { Routes } from "@/shared/config/route/routes";

export const routesConfig = [
  {
    path: Routes.SCENARIOS,
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <ScenariosPage />,
      },
      // {
      //   path: Routes.MOVIES,
      //   element: <MoviesPage />,
      //   children: [
      //     {
      //       index: true,
      //       element: <MoviesLogic />,
      //     },
      //     {
      //       path: Routes.MOVIES_SEARCH,
      //       element: (
      //         <Suspense fallback={<Loader />}>
      //           <MoviesSearchPage />,
      //         </Suspense>
      //       ),
      //     },
      //     {
      //       path: Routes.MOVIES_SEARCH_DETAIL,
      //       element: (
      //         <Suspense fallback={<Loader />}>
      //           <MovieDetailsPage />
      //         </Suspense>
      //       ),
      //     },
      //   ],
      // },
    ],
  },
];

export const AppRouter = createBrowserRouter(routesConfig);
