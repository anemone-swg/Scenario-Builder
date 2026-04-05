import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { EditorNavbar } from "@/widgets/EditorNavbar";
import { ScenarioEditor } from "@/widgets/ScenarioEditor";
import { useScenarioStore } from "@/entities/Scenario";

const ScenarioEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const { scenarios } = useScenarioStore();

  const scenario = useMemo(() => {
    return id ? scenarios.find((s) => s.id === id) : null;
  }, [id, scenarios]);

  const error = !id
    ? "ID сценария не указан"
    : !scenario
      ? `Сценарий с id "${id}" не найден`
      : null;

  if (error) {
    return <EditorNavbar error={error} />;
  }

  return (
    <>
      <EditorNavbar scenarioName={scenario?.name} />
      {scenario && <ScenarioEditor scenario={scenario} />}
    </>
  );
};

export default ScenarioEditorPage;
