import { ItemPF2e } from "@item";
import { BaseWeaponType } from "@item/weapon/types";
import { DeityData } from "./data";
import { DeitySheetPF2e } from "./sheet";
declare class DeityPF2e extends ItemPF2e {
    get category(): "deity" | "pantheon" | "philosophy";
    get favoredWeapons(): BaseWeaponType[];
    override: any;
    prepareBaseData(): void;
    override: any;
    prepareActorData(this: Embedded<DeityPF2e>): void;
    /** If applicable, set a trained proficiency with this deity's favored weapon */
    setFavoredWeaponRank(this: Embedded<DeityPF2e>): void;
}
interface DeityPF2e extends ItemPF2e {
    readonly data: DeityData;
    readonly _sheet: DeitySheetPF2e<this>;
}
export { DeityPF2e };
