import { memo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { createScenarioApi, useScenarioStore } from "@/entities/Scenario";
import { Button } from "@/shared/ui/Button";
import { GLOBAL_TEXT } from "@/shared/config/texts/globalTexts.ts";
import { MdAdd } from "react-icons/md";

const CreateScenarioBtn = () => {
  const { addScenario } = useScenarioStore();
  const [isCreating, setIsCreating] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const handleCreateScenario = async () => {
    try {
      setIsCreating(true);
      const newScenario = await createScenarioApi(`Новый сценарий`);
      addScenario(newScenario);
    } catch (error) {
      console.error("Ошибка при создании сценария:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button onClick={handleCreateScenario} disabled={isCreating}>
      {isCreating ? (
        <p>{GLOBAL_TEXT.creating}</p>
      ) : isMobile ? (
        <MdAdd />
      ) : (
        <span>{GLOBAL_TEXT.create_scenario}</span>
      )}
    </Button>
  );
};

export default memo(CreateScenarioBtn);
