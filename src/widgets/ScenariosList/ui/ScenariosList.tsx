import { useEffect, useRef, useState } from "react";
import { ScenarioCard } from "@/features/ScenarioCard";
import { loadScenariosApi, useScenarioStore } from "@/entities/Scenario";
import { Loader } from "@/shared/ui/Loader";
import { GLOBAL_TEXT } from "@/shared/config/texts/globalTexts.ts";

const ScenariosList = () => {
  const { scenarios, loadScenarios } = useScenarioStore();
  const [isLoading, setIsLoading] = useState(false);
  const hasLoaded = useRef(false);

  useEffect(() => {
    const loadScenariosFromServer = async () => {
      if (!hasLoaded.current && scenarios.length === 0) {
        try {
          setIsLoading(true);
          const scenariosFromServer = await loadScenariosApi();
          loadScenarios(scenariosFromServer);
          hasLoaded.current = true;
        } catch (error) {
          console.error("Ошибка загрузки сценариев:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadScenariosFromServer();
  }, [scenarios.length, loadScenarios]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={"flex flex-col w-fit"}>
      {scenarios.length === 0 ? (
        <h3 className="text-lg font-medium mb-2">{GLOBAL_TEXT.no_scenarios}</h3>
      ) : (
        <>
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              classNames={"w-full"}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ScenariosList;
