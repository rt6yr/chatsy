import { Mask } from "../store/mask";
import { type BuiltinMask } from "./typing";
export { type BuiltinMask } from "./typing";

export const BUILTIN_MASK_ID = 100000;

export const BUILTIN_MASK_STORE = {
  buildinId: BUILTIN_MASK_ID,
  masks: {} as Record<string, BuiltinMask>,
  get(id?: string) {
    if (!id) return undefined;
    return this.masks[id] as Mask | undefined;
  },
  add(m: BuiltinMask) {
    const mask = { ...m, id: this.buildinId++, builtin: true };
    this.masks[mask.id] = mask;
    return mask;
  },
};

export const BUILTIN_MASKS: BuiltinMask[] = [];

if (typeof window !== "undefined") {
  // run in browser skip in next server
  fetch("/masks.json")
    .then((res) => res.json())
    .catch((error) => {
      console.error("[Fetch] failed to fetch masks", error);
      return { en: [] }; // Fallback in case of error: only 'en' array
    })
    .then((masks) => {
      const { en = [] } = masks; // Ensure there's always an 'en' array
      if (Array.isArray(en)) {
        // Ensure 'en' is an array before processing
        en.forEach((m) => {
          BUILTIN_MASKS.push(BUILTIN_MASK_STORE.add(m));
        });
      } else {
        console.error("[Fetch] 'en' is not an array:", en);
      }
    });
}
