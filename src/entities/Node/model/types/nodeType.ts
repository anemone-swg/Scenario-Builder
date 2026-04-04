import type { Node } from "@xyflow/react";

export type NodeType = "action" | "condition";

export interface ActionNodeData extends Node {
  type: "action";
  data: {
    label: string;
    description?: string;
  };
}

export interface ConditionNodeData extends Node {
  type: "condition";
  data: {
    label: string;
    description?: string;
  };
}

export type CustomNode = ActionNodeData | ConditionNodeData;
