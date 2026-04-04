import type { CustomNode } from "@/entities/Node";
import type { CustomEdge } from "@/entities/Edge";

export interface Scenario {
  id: string;
  name: string;
  updatedAt: Date;
  nodes?: CustomNode[];
  edges?: CustomEdge[];
}
