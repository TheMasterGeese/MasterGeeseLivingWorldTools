import { ItemTrait } from "@item/data/base";
import { ABILITY_ABBREVIATIONS, DC_SLUGS, SAVE_TYPES, SKILL_ABBREVIATIONS, SKILL_LONG_FORMS } from "./values";
declare type AbilityString = SetElement<typeof ABILITY_ABBREVIATIONS>;
interface ActorDimensions {
    length: number;
    width: number;
    height: number;
}
declare type SkillAbbreviation = SetElement<typeof SKILL_ABBREVIATIONS>;
declare type SkillLongForm = SetElement<typeof SKILL_LONG_FORMS>;
declare type ActorAlliance = "party" | "opposition" | null;
declare type DCSlug = SetElement<typeof DC_SLUGS>;
declare type SaveType = typeof SAVE_TYPES[number];
interface AuraData {
    slug: string;
    radius: number;
    effects: AuraEffectData[];
    colors?: AuraColors;
    traits: ItemTrait[];
}
interface AuraEffectData {
    uuid: string;
    affects: "allies" | "enemies" | "all";
    events: ("enter" | "turn-start" | "turn-end")[];
    save: {
        type: SaveType;
        dc: number;
    } | null;
    removeOnExit: boolean;
}
interface AuraColors {
    border: `#${string}`;
    fill: `#${string}`;
}
export { AbilityString, ActorAlliance, ActorDimensions, AuraColors, AuraData, AuraEffectData, DCSlug, SaveType, SkillAbbreviation, SkillLongForm, };
