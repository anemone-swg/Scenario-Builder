import { memo, useCallback } from "react";
import { Handle, type NodeProps, Position, useReactFlow } from "@xyflow/react";
import { MdClose } from "react-icons/md";
import { Button } from "@/shared/ui/Button";
import { EditableText } from "@/shared/ui/EditableText";
import type { ActionNodeData } from "../model/types/nodeType.ts";

const ActionNode = ({ data, selected, id }: NodeProps<ActionNodeData>) => {
  const { deleteElements, setNodes, getNodes } = useReactFlow();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  const updateNodeData = useCallback(
    (updates: Partial<ActionNodeData["data"]>) => {
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

  return (
    <div
      className={`
        px-4 py-2 rounded-lg shadow-md border-2 min-w-[160px] text-center
        transition-all duration-200
        ${selected && "scale-105"}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 border-2 border-(--border-color)"
      />

      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-1 flex-1">
          <EditableText
            value={data.label || ""}
            placeholder="Название..."
            className="font-semibold text-sm"
            inputClassName="font-semibold text-sm w-full"
            onSave={handleSaveLabel}
          />

          <EditableText
            value={data.description || ""}
            placeholder="Описание..."
            className="text-xs opacity-75"
            inputClassName="text-xs w-full"
            onSave={handleSaveDescription}
          />
        </div>

        <Button variant="small" onClick={handleDelete}>
          <MdClose />
        </Button>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 border-2 border-(--border-color)"
      />
    </div>
  );
};

export default memo(ActionNode);
