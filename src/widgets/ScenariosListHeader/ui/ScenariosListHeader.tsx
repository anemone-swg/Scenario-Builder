import { memo } from "react";
import { CreateScenarioBtn } from "@/features/CreateScenarioBtn";
import { GLOBAL_TEXT } from "@/shared/config/texts/globalTexts.ts";

const ScenariosListHeader = () => {
  return (
    <div
      className={
        "flex justify-between items-center mb-8 pb-4 border-b border-(--border-color)"
      }
    >
      <h1 className={"text-3xl font-bold"}>{GLOBAL_TEXT.scenarios}</h1>
      <CreateScenarioBtn />
    </div>
  );
};

export default memo(ScenariosListHeader);
