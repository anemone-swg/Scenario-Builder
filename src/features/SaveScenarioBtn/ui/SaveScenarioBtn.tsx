import { memo, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { GLOBAL_TEXT } from "@/shared/config/texts/globalTexts.ts";
import { saveScenarioApi, useScenarioStore } from "@/entities/Scenario";
import { useParams } from "react-router-dom";

const SaveScenarioBtn = () => {
  const { id } = useParams<{ id: string }>();
  const [isSaving, setIsSaving] = useState(false);
  const { scenarios } = useScenarioStore();

  const handleSave = async () => {
    if (!id) return;

    try {
      setIsSaving(true);

      const currentScenario = scenarios.find((scenario) => scenario.id === id);
      if (!currentScenario) return;

      await saveScenarioApi(currentScenario);
    } catch (error) {
      console.error("Ошибка при сохранении сценариев:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button disabled={isSaving} onClick={handleSave}>
      {GLOBAL_TEXT.save}
    </Button>
  );
};

export default memo(SaveScenarioBtn);
