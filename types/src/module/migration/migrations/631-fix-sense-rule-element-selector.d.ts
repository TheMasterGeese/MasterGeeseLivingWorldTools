import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
/** Correct any sense rule element selector values that are using the old lowercase selector values */
export declare class Migration631FixSenseRuleElementSelector extends MigrationBase {
    static override: any;
    version: number;
    private readonly SENSE_SELECTOR_CONVERSION;
    override: any;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
