import { Button } from "@/shared/ui/Button";
import { Routes } from "@/shared/config/route/routes";
import { GLOBAL_TEXT } from "@/shared/config/texts/globalTexts.ts";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

interface EditorNavbarProps {
  error?: string;
  scenarioName?: string;
}

const EditorNavbar = ({ error, scenarioName }: EditorNavbarProps) => {
  const navigate = useNavigate();

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
    </>
  );
};

export default memo(EditorNavbar);
