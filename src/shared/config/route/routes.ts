export const Routes = {
  SCENARIOS: "/",
  SCENARIO: "/scenario/:id",
  getScenario: (id: string | number) => `/scenario/${id}`,
} as const;
