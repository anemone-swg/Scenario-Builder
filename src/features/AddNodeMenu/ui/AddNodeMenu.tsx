import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { MdAdd, MdClose } from "react-icons/md";
import type { CustomNode, NodeType } from "@/entities/Node";
import { Button } from "@/shared/ui/Button";
import { NODE_TYPES } from "../consts/nodeTypes.ts";

const generateNodeId = (type: string) => {
  return `${type}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
};

const generateRandomPosition = () => {
  return {
    x: Math.random() * 300 + 100,
    y: Math.random() * 300 + 100,
  };
};

const AddNodeMenu = () => {
  const { setNodes, getNodes } = useReactFlow();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addNode = useCallback(
    (type: NodeType, defaultData: { label: string; description: string }) => {
      const nodes = getNodes();
      const newNodeId = generateNodeId(type);
      const position = generateRandomPosition();

      const newNode: CustomNode = {
        id: newNodeId,
        type,
        position,
        data: {
          label: defaultData.label,
          description: defaultData.description,
        },
      };

      setNodes([...nodes, newNode]);
      setIsOpen(false);
    },
    [getNodes, setNodes],
  );

  return (
    <div className="fixed bottom-6 right-6 z-10" ref={menuRef}>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <MdClose /> : <MdAdd />}
      </Button>

      {isOpen && (
        <div className="bg-(--background-color) absolute bottom-14 right-0 mb-2 w-48 rounded-lg border border-(--border-color) overflow-hidden">
          <div className="py-1">
            {NODE_TYPES.map((node) => (
              <Button
                variant="menu"
                key={node.type}
                onClick={() => addNode(node.type, node.defaultData)}
              >
                <span>{node.name}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(AddNodeMenu);
