import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Fix Rule Element values reaching for too many datas */
export declare class Migration677RuleValueDataRefs extends MigrationBase {
    static override: any;
    version: number;
    override: any;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
