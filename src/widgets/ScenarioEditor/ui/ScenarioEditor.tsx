import { useCallback, useMemo } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  ReactFlow,
} from "@xyflow/react";
import { AddNodeMenu } from "@/features/AddNodeMenu";
import { type CustomNode } from "@/entities/Node";
import { type CustomEdge } from "@/entities/Edge";
import { type Scenario, useScenarioStore } from "@/entities/Scenario";
import {
  scenarioEdgeTypes,
  scenarioNodeTypes,
} from "../consts/scenarioTypes.ts";

interface ScenarioEditorProps {
  scenario: Scenario;
}

const ScenarioEditor = ({ scenario }: ScenarioEditorProps) => {
  const { updateScenarioFlow } = useScenarioStore();

  const nodes = useMemo(() => scenario?.nodes || [], [scenario]);
  const edges = useMemo(() => scenario?.edges || [], [scenario]);

  const onNodesChange: OnNodesChange<CustomNode> = useCallback(
    (changes) => {
      if (!scenario.id) return;
      const newNodes = applyNodeChanges(changes, nodes);
      updateScenarioFlow(scenario.id, newNodes, edges);
    },
    [scenario.id, nodes, edges, updateScenarioFlow],
  );

  const onEdgesChange: OnEdgesChange<CustomEdge> = useCallback(
    (changes) => {
      if (!scenario.id) return;
      const newEdges = applyEdgeChanges(changes, edges);
      updateScenarioFlow(scenario.id, nodes, newEdges);
    },
    [scenario.id, nodes, edges, updateScenarioFlow],
  );

  const onConnect: OnConnect = useCallback(
    (params) => {
      if (!scenario.id) return;

      const newEdge: CustomEdge = {
        ...params,
        id: `edge-${params.source}-${params.target}-${Date.now()}`,
        type: "customEdge",
        data: {
          sourceHandle: params.sourceHandle,
        },
      };

      const newEdges = addEdge(newEdge, edges);
      updateScenarioFlow(scenario.id, nodes, newEdges);
    },
    [scenario.id, nodes, edges, updateScenarioFlow],
  );

  return (
    <div className={"flex justify-center"}>
      <div
        style={{ width: "80vw", height: "80vh" }}
        className="rounded-lg p-8 text-center bg-(--background-color-second)"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={scenarioNodeTypes}
          edgeTypes={scenarioEdgeTypes}
          fitView
          style={{ color: "var(--text-color-second)" }}
        >
          <AddNodeMenu />
          <Controls
            style={{
              color: "var(--text-color-second)",
            }}
          />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default ScenarioEditor;
