import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { GLOBAL_TEXT } from "@/shared/config/texts/globalTexts.ts";
import { saveScenariosApi, useScenarioStore } from "@/entities/Scenario";

const SaveScenariosBtn = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { scenarios } = useScenarioStore();

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveScenariosApi(scenarios);
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

export default SaveScenariosBtn;
