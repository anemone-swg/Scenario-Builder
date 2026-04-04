import {useCallback, useMemo} from "react";
import {useNavigate, useParams} from "react-router-dom";
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
import {AddNodeMenu} from "@/features/AddNodeMenu";
import {useScenarioStore} from "@/entities/Scenario";
import {ActionNode, ConditionNode, type CustomNode} from "@/entities/Node";
import {type CustomEdge, CustomEdgeWithLabel} from "@/entities/Edge";
import {Button} from "@/shared/ui/Button";
import {Routes} from "@/shared/config/route/routes";
import {GLOBAL_TEXT} from "@/shared/config/texts/globalTexts.ts";

const nodeTypes = {
  action: ActionNode,
  condition: ConditionNode,
};

const edgeTypes = {
  customEdge: CustomEdgeWithLabel,
};

const ScenarioEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { scenarios, updateScenarioFlow } = useScenarioStore();

  const scenario = useMemo(() => {
    return id ? scenarios.find((s) => s.id === id) : null;
  }, [id, scenarios]);

  const error = !id
    ? "ID сценария не указан"
    : !scenario
      ? `Сценарий с id "${id}" не найден`
      : null;

  const nodes = useMemo(() => scenario?.nodes || [], [scenario]);
  const edges = useMemo(() => scenario?.edges || [], [scenario]);
  const scenarioName = scenario?.name || "";

  const onNodesChange: OnNodesChange<CustomNode> = useCallback(
    (changes) => {
      if (!id) return;
      const newNodes = applyNodeChanges(changes, nodes);
      updateScenarioFlow(id, newNodes, edges);
    },
    [id, nodes, edges, updateScenarioFlow],
  );

  const onEdgesChange: OnEdgesChange<CustomEdge> = useCallback(
    (changes) => {
      if (!id) return;
      const newEdges = applyEdgeChanges(changes, edges);
      updateScenarioFlow(id, nodes, newEdges);
    },
    [id, nodes, edges, updateScenarioFlow],
  );

  const onConnect: OnConnect = useCallback(
    (params) => {
      if (!id) return;

      const newEdge: CustomEdge = {
        ...params,
        id: `edge-${params.source}-${params.target}-${Date.now()}`,
        type: "customEdge",
        data: {
          sourceHandle: params.sourceHandle,
        },
      };

      const newEdges = addEdge(newEdge, edges);
      updateScenarioFlow(id, nodes, newEdges);
    },
    [id, nodes, edges, updateScenarioFlow],
  );

  if (error) {
    return (
      <div className="mb-4">
        <Button onClick={() => navigate(Routes.SCENARIOS)}>
          {GLOBAL_TEXT.back_to_list}
        </Button>
        <p className="text-center text-(--text-color-red) text-lg mb-4">
          {error}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <Button onClick={() => navigate(Routes.SCENARIOS)}>
          {GLOBAL_TEXT.back_to_list}
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-4">
        {GLOBAL_TEXT.script_editor}: {scenarioName}
      </h1>
      <hr className="mb-4" />
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
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
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
    </>
  );
};

export default ScenarioEditorPage;
