export const deleteScenarioApi = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log(`Сценарий ${id} удален на сервере`);
};
