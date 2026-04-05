import { useCallback } from "react";
import type { Node } from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";

export const useNodeActions = <T extends Node>(id: string) => {
  const { deleteElements, setNodes, getNodes } = useReactFlow();

  const handleDelete = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      await deleteElements({ nodes: [{ id }] });
    },
    [id, deleteElements],
  );

  const updateNodeData = useCallback(
    (updates: Partial<T["data"]>) => {
      const nodes = getNodes();
      const updatedNodes = nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                ...updates,
              },
            }
          : node,
      );
      setNodes(updatedNodes);
    },
    [id, getNodes, setNodes],
  );

  const handleSaveLabel = useCallback(
    (newLabel: string) => {
      updateNodeData({ label: newLabel });
    },
    [updateNodeData],
  );

  const handleSaveDescription = useCallback(
    (newDescription: string) => {
      updateNodeData({ description: newDescription });
    },
    [updateNodeData],
  );

  return {
    handleDelete,
    updateNodeData,
    handleSaveLabel,
    handleSaveDescription,
  };
};
