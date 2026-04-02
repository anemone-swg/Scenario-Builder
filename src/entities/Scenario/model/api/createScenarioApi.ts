import { type Scenario } from "../types/scenario.ts";

export const createScenarioApi = async (name: string): Promise<Scenario> => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const randomNumber = Math.floor(Math.random() * 1000);

  return {
    id: Date.now().toString(),
    name: `${name} №${randomNumber}`,
    updatedAt: new Date(),
  };
};
