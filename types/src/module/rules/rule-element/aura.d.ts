import { AuraColors, AuraEffectData } from "@actor/types";
import { ItemPF2e } from "@item";
import { ItemTrait } from "@item/data/base";
import { RawPredicate } from "@system/predication";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./";
/** A Pathfinder 2e aura, capable of transmitting effects and with a visual representation on the canvas */
export declare class AuraRuleElement extends RuleElementPF2e {
    #private;
    override: any;
    slug: string;
    /** The radius of the order in feet, or a string that will resolve to one */
    radius: number | string;
    /** References to effects included in this aura */
    effects: AuraEffectData[];
    /** Associated traits, including ones that determine transmission through walls ("visual", "auditory") */
    traits: ItemTrait[];
    /**
     * Custom border and fill colors for the aura: if omitted, the border color will be black, and the fill color the
     * user's assigned color
     */
    colors?: AuraColors;
    constructor(data: AuraRuleElementSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    override: any;
    beforePrepareData(): void;
}
interface AuraRuleElementSource extends RuleElementSource {
    predicate?: RawPredicate;
    radius?: unknown;
    effects?: unknown;
    traits?: unknown;
    colors?: unknown;
}
export {};
