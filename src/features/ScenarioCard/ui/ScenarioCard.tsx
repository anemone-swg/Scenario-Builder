import { memo, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  deleteScenarioApi,
  type Scenario,
  useScenarioStore,
} from "@/entities/Scenario";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { GLOBAL_TEXT } from "@/shared/config/texts/globalTexts.ts";
import { Routes } from "@/shared/config/route/routes";

interface ScenarioCardProps {
  scenario: Scenario;
  classNames?: string;
}

const ScenarioCard = ({ scenario, classNames }: ScenarioCardProps) => {
  const navigate = useNavigate();
  const { removeScenario } = useScenarioStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`${GLOBAL_TEXT.delete_scenario}: "${scenario.name}"?`)) {
      try {
        setIsEditing(true);
        await deleteScenarioApi(scenario.id);
        removeScenario(scenario.id);
      } catch (error) {
        console.error("Ошибка при создании сценария:", error);
      } finally {
        setIsEditing(false);
      }
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(Routes.getScenario(scenario.id));
  };

  return (
    <Card className={classNames}>
      <p className={"font-semibold"}>
        {GLOBAL_TEXT.name}: {scenario.name}
      </p>
      <p className={"text-sm"}>
        {GLOBAL_TEXT.updatedAt}: {scenario.updatedAt.toLocaleString()}
      </p>
      <div className={"flex gap-2 ml-auto"}>
        <Button onClick={handleEdit} disabled={isEditing}>
          <FaRegEdit />
        </Button>
        <Button onClick={handleDelete} disabled={isEditing}>
          <MdDeleteOutline />
        </Button>
      </div>
    </Card>
  );
};

export default memo(ScenarioCard);
