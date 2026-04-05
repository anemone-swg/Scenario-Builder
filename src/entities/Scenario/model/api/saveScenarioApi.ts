import type { Scenario } from "../types/scenario.ts";

export const saveScenarioApi = async (scenario: Scenario): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log("Отправка данных на сервер:", scenario);
};
