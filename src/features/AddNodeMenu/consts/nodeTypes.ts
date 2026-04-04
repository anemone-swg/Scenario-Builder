import type { NodeConfig } from "../model/types/nodeConfig.ts";
import { GLOBAL_TEXT } from "@/shared/config/texts/globalTexts.ts";

export const NODE_TYPES: NodeConfig[] = [
  {
    type: "action",
    name: GLOBAL_TEXT.action,
    defaultData: {
      label: GLOBAL_TEXT.new_action,
      description: GLOBAL_TEXT.action_desc,
    },
  },
  {
    type: "condition",
    name: GLOBAL_TEXT.condition,
    defaultData: {
      label: GLOBAL_TEXT.new_condition,
      description: GLOBAL_TEXT.condition_desc,
    },
  },
];
