import type { Scenario } from "../types/scenario.ts";
import { mockScenarios } from "../mock/mockScenarios.ts";

export const loadScenariosApi = async (): Promise<Scenario[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockScenarios;
};
