import { memo, useMemo } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";
import { MdClose } from "react-icons/md";
import { Button } from "@/shared/ui/Button";
import type { CustomEdge } from "../model/types/edgeTypes.ts";

const CustomEdgeWithLabel = ({
  id,
  source,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<CustomEdge>) => {
  const { deleteElements, getNode } = useReactFlow();

  const sourceNode = getNode(source);

  const edgeLabel = useMemo(() => {
    if (data?.label) return data.label;

    if (sourceNode?.type === "condition") {
      const handle = data?.sourceHandle;
      if (handle === "true" || handle === "right") return "Да";
      if (handle === "false" || handle === "left") return "Нет";
    }

    return "";
  }, [sourceNode, data]);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteElements({ edges: [{ id }] });
  };

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        className={`transition-all duration-200`}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="bg-(--background-color-second) flex items-center gap-1 px-2 py-1 rounded-md border border-(--border-color) text-xs"
        >
          {edgeLabel && (
            <span className="cursor-pointer min-w-[20px] text-center">
              {edgeLabel}
            </span>
          )}
          <Button variant={"small"} onClick={handleDelete}>
            <MdClose />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default memo(CustomEdgeWithLabel);
