export const Routes = {
  SCENARIOS: "/",
  SCENARIO: "/scenario",
  getScenario: (id: string | number) => `/scenario/${id}`,
} as const;
