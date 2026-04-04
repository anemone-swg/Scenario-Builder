import type { CustomNode } from "@/entities/Node";
import type { CustomEdge } from "@/entities/Edge";
import { type Scenario } from "../types/scenario.ts";

const initialNodes: CustomNode[] = [
  {
    id: "start",
    type: "action",
    position: { x: 250, y: 0 },
    data: {
      label: "Начало",
      description: "Старт сценария",
    },
  },
  {
    id: "condition-1",
    type: "condition",
    position: { x: 250, y: 150 },
    data: {
      label: "Проверка пользователя",
      description: "Есть ли пользователь в базе?",
    },
  },
  {
    id: "action-1",
    type: "action",
    position: { x: 100, y: 300 },
    data: {
      label: "Создать пользователя",
      description: "Регистрация нового пользователя",
    },
  },
  {
    id: "action-2",
    type: "action",
    position: { x: 400, y: 300 },
    data: {
      label: "Отправить приветствие",
      description: "Отправить welcome email",
    },
  },
  {
    id: "action-3",
    type: "action",
    position: { x: 250, y: 450 },
    data: {
      label: "Завершить",
      description: "Конец сценария",
    },
  },
];

const initialEdges: CustomEdge[] = [
  {
    id: "edge-start-condition",
    source: "start",
    target: "condition-1",
    type: "customEdge",
    data: { label: "" },
  },
  {
    id: "edge-condition-action1",
    source: "condition-1",
    sourceHandle: "false",
    target: "action-1",
    type: "customEdge",
    data: { label: "Нет" },
  },
  {
    id: "edge-condition-action2",
    source: "condition-1",
    sourceHandle: "true",
    target: "action-2",
    type: "customEdge",
    data: { label: "Да" },
  },
  {
    id: "edge-action1-action3",
    source: "action-1",
    target: "action-3",
    type: "customEdge",
    data: { label: "" },
  },
  {
    id: "edge-action2-action3",
    source: "action-2",
    target: "action-3",
    type: "customEdge",
    data: { label: "" },
  },
];

export const mockScenarios: Scenario[] = [
  {
    id: "1",
    name: "Приветственный сценарий",
    updatedAt: new Date("2024-03-15T10:30:00"),
    nodes: initialNodes,
    edges: initialEdges,
  },
  {
    id: "2",
    name: "Сценарий обработки заказа",
    updatedAt: new Date("2024-03-14T15:45:00"),
    nodes: [],
    edges: [],
  },
  {
    id: "3",
    name: "Сценарий возврата товара",
    updatedAt: new Date("2024-03-10T09:20:00"),
    nodes: [],
    edges: [],
  },
];
