import { createBrowserRouter } from "react-router-dom";
import App from "@/app/App";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ScenariosPage } from "@/pages/ScenariosPage";
import { ScenarioEditorPage } from "@/pages/ScenarioEditorPage";
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
      {
        path: Routes.SCENARIO,
        element: <ScenarioEditorPage />,
      },
    ],
  },
];

export const AppRouter = createBrowserRouter(routesConfig);
