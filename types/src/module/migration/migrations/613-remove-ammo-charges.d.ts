import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
/** Remove charges from ammunition to ensure ammo consumption works properly. */
export declare class Migration613RemoveAmmoCharges extends MigrationBase {
    static override: any;
    version: number;
    override: any;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
