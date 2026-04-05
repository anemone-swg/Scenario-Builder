import { memo } from "react";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import { MdClose } from "react-icons/md";
import { Button } from "@/shared/ui/Button";
import { EditableText } from "@/shared/ui/EditableText";
import type { ConditionNodeData } from "../model/types/nodeType.ts";
import { useNodeActions } from "../lib/hooks/useNodeActions.ts";

const ConditionNode = ({
  data,
  selected,
  id,
}: NodeProps<ConditionNodeData>) => {
  const { handleDelete, handleSaveLabel, handleSaveDescription } =
    useNodeActions<ConditionNodeData>(id);

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 border-2 border-white z-10"
      />

      <div
        className={`
          w-32 h-32 flex items-center justify-center
          transition-all duration-200
          ${selected && "scale-105"}
        `}
        style={{
          transform: "rotate(45deg)",
          borderWidth: "2px",
          borderStyle: "solid",
          borderRadius: "8px",
        }}
      >
        <div
          className="flex flex-col items-center justify-center gap-1 p-2"
          style={{ transform: "rotate(-45deg)" }}
        >
          <div className="font-semibold text-sm flex items-center justify-center gap-1">
            <EditableText
              value={data.label || ""}
              placeholder="Название..."
              className="text-center"
              inputClassName="text-center w-full"
              onSave={handleSaveLabel}
            />
            <Button variant="small" onClick={handleDelete}>
              <MdClose />
            </Button>
          </div>
          {data.description && (
            <EditableText
              value={data.description}
              placeholder="Описание..."
              className="text-xs opacity-75 text-center"
              inputClassName="text-xs text-center w-full"
              onSave={handleSaveDescription}
            />
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        className="w-3 h-3 border-2 border-(--border-color)"
        style={{ top: "50%", right: "-12px" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="false"
        className="w-3 h-3 border-2 border-(--border-color)"
        style={{ top: "50%", left: "-12px" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="default"
        className="w-3 h-3 border-2 border-(--border-color)"
      />
    </div>
  );
};

export default memo(ConditionNode);
