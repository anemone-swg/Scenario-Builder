import type { Scenario } from "../types/scenario.ts";

export const saveScenariosApi = async (
  scenarios: Scenario[],
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log("Отправка данных на сервер:", {
    scenarios: scenarios,
  });
};
