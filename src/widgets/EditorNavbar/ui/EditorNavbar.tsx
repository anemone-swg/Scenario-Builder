import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { SaveScenarioBtn } from "@/features/SaveScenarioBtn";
import { Button } from "@/shared/ui/Button";
import { Routes } from "@/shared/config/route/routes";
import { GLOBAL_TEXT } from "@/shared/config/texts/globalTexts.ts";

interface EditorNavbarProps {
  error?: string;
  scenarioName?: string;
}

const EditorNavbar = ({ error, scenarioName }: EditorNavbarProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(Routes.SCENARIOS);
  };

  if (error) {
    return (
      <div className="mb-4">
        <Button onClick={handleNavigate}>{GLOBAL_TEXT.back_to_list}</Button>
        <p className="text-center text-(--text-color-red) text-lg mb-4">
          {error}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-between">
        <Button onClick={handleNavigate}>{GLOBAL_TEXT.back_to_list}</Button>
        <SaveScenarioBtn />
      </div>
      <h1 className="text-2xl font-bold mb-4">
        {GLOBAL_TEXT.script_editor}: {scenarioName}
      </h1>
      <hr className="mb-4" />
    </>
  );
};

export default memo(EditorNavbar);
