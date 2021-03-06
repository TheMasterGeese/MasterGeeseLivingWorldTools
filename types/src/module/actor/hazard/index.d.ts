import { ActorPF2e } from "@actor";
import { SaveType } from "@actor/types";
import { ItemType } from "@item/data";
import { Rarity } from "@module/data";
import { Statistic } from "@system/statistic";
import { HazardData } from "./data";
export declare class HazardPF2e extends ActorPF2e {
    override: any;
    get allowedItemTypes(): (ItemType | "physical")[];
    get rarity(): Rarity;
    get isComplex(): boolean;
    /** Minimal check since the disabled status of a hazard isn't logged */
    override: any;
    get canAttack(): boolean;
    override: any;
    prepareBaseData(): void;
    override: any;
    prepareDerivedData(): void;
    protected prepareSaves(): {
        [K in SaveType]?: Statistic;
    };
}
export interface HazardPF2e {
    readonly data: HazardData;
    saves: {
        [K in SaveType]?: Statistic;
    };
}
