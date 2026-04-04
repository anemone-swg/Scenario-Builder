import type { Edge } from "@xyflow/react";

export interface CustomEdgeData extends Record<string, unknown> {
  label?: string;
  sourceHandle?: string | null;
}

export type CustomEdge = Edge<CustomEdgeData>;
