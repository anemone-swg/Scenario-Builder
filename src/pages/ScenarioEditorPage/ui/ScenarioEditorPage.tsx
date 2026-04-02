import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { Routes } from "@/shared/config/route/routes";
import { GLOBAL_TEXT } from "@/shared/config/texts/globalTexts.ts";

const ScenarioEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <>
      <div className="mb-4">
        <Button onClick={() => navigate(Routes.SCENARIOS)}>
          {GLOBAL_TEXT.back_to_list}
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Редактор сценария ID: {id}</h1>
      <div className="rounded-lg p-8 text-center">
        Здесь будет редактор блок-схемы с React Flow
      </div>
    </>
  );
};

export default ScenarioEditorPage;
