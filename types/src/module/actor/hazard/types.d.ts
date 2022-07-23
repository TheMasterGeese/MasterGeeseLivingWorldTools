import { HazardPF2e } from "@actor";
import { ActorSheetDataPF2e } from "@actor/sheet/data-types";
import { SaveType } from "@actor/types";
import { ActionItemPF2e } from "@item";
interface HazardSheetData extends ActorSheetDataPF2e<HazardPF2e> {
    actions: HazardActionSheetData;
    editing: boolean;
    actorTraits: string[];
    rarity: Record<string, string>;
    rarityLabel: string;
    brokenThreshold: number;
    saves: HazardSaveSheetData[];
    stealthDC: number | null;
    hasDefenses: boolean;
    hasHPDetails: boolean;
    hasSaves: boolean;
    hasIWR: boolean;
    hasStealth: boolean;
    hasStealthDescription: boolean;
    hasDescription: boolean;
    hasDisable: boolean;
    hasRoutineDetails: boolean;
    hasResetDetails: boolean;
}
interface HazardActionSheetData {
    reaction: ActionItemPF2e[];
    action: ActionItemPF2e[];
}
interface HazardSaveSheetData {
    label: string;
    type: SaveType;
    mod?: number;
}
export { HazardActionSheetData, HazardSaveSheetData, HazardSheetData };
