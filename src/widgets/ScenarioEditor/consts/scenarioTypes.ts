import { CustomEdgeWithLabel } from "@/entities/Edge";
import { ActionNode, ConditionNode } from "@/entities/Node";

export const scenarioNodeTypes = {
  action: ActionNode,
  condition: ConditionNode,
};

export const scenarioEdgeTypes = {
  customEdge: CustomEdgeWithLabel,
};
