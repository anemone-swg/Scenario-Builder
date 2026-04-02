import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Scenario } from "../types/scenario.ts";

interface IScenarioState {
  scenarios: Scenario[];
  loadScenarios(scenarios: Scenario[]): void;
  addScenario(scenarioResult: Scenario): Scenario;
  updateScenario(id: string, scenarioResult: Scenario): Scenario;
  removeScenario(id: string): void;
}

export const useScenarioStore = create<IScenarioState>()(
  persist(
    (set) => ({
      scenarios: [],

      loadScenarios: (scenarios) => {
        set({ scenarios });
      },

      addScenario: (scenarioResult: Scenario) => {
        set((state) => ({
          scenarios: [...state.scenarios, scenarioResult],
        }));

        return scenarioResult;
      },

      updateScenario: (id: string, scenarioResult: Scenario) => {
        set((state) => ({
          scenarios: state.scenarios.map((scenario) =>
            scenario.id === id ? scenarioResult : scenario,
          ),
        }));

        return scenarioResult;
      },

      removeScenario: (id: string) => {
        set((state) => ({
          scenarios: state.scenarios.filter((scenario) => scenario.id !== id),
        }));
      },
    }),
    {
      name: "scenario-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.scenarios = state.scenarios.map((scenario) => ({
            ...scenario,
            updatedAt: new Date(scenario.updatedAt),
          }));
        }
      },
    },
  ),
);
