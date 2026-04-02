import { type Scenario } from "../types/scenario.ts";

export const mockScenarios: Scenario[] = [
  {
    id: "1",
    name: "Приветственный сценарий",
    updatedAt: new Date("2024-03-15T10:30:00"),
  },
  {
    id: "2",
    name: "Сценарий обработки заказа",
    updatedAt: new Date("2024-03-14T15:45:00"),
  },
  {
    id: "3",
    name: "Сценарий возврата товара",
    updatedAt: new Date("2024-03-10T09:20:00"),
  },
];
