import fs from "fs";
import path from "path";
import { EN_MASKS } from "./en";  // Only import EN_MASKS

import { type BuiltinMask } from "./typing";

// Only keep EN_MASKS in the BUILTIN_MASKS object
const BUILTIN_MASKS: Record<string, BuiltinMask[]> = {
  en: EN_MASKS,
};

const dirname = path.dirname(__filename);

fs.writeFile(
  dirname + "/../../public/masks.json",
  JSON.stringify(BUILTIN_MASKS, null, 4),
  function (error) {
    if (error) {
      console.error("[Build] failed to build masks", error);
    }
  },
);
