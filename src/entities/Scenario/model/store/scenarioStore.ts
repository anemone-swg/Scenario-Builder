import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {CustomNode} from "@/entities/Node";
import {type Scenario} from "../types/scenario.ts";
import type {CustomEdge} from "@/entities/Edge";

interface IScenarioState {
  scenarios: Scenario[];

  updateScenarioFlow: (
    id: string,
    nodes: CustomNode[],
    edges: CustomEdge[],
  ) => void;

  loadScenarios(scenarios: Scenario[]): void;

  addScenario(scenarioResult: Scenario): Scenario;

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

      removeScenario: (id: string) => {
        set((state) => ({
          scenarios: state.scenarios.filter((scenario) => scenario.id !== id),
        }));
      },

      updateScenarioFlow: (
        id: string,
        nodes: CustomNode[],
        edges: CustomEdge[],
      ) => {
        set((state) => ({
          scenarios: state.scenarios.map((scenario) =>
            scenario.id === id
              ? { ...scenario, nodes, edges, updatedAt: new Date() }
              : scenario,
          ),
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
