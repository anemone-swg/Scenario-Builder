import type { NodeType } from "@/entities/Node";

export interface NodeConfig {
  type: NodeType;
  name: string;
  defaultData: {
    label: string;
    description: string;
  };
}
