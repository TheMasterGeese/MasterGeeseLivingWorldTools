import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove exclusive NPC attack traits from weapons */
export declare class Migration678SeparateNPCAttackTraits extends MigrationBase {
    static override: any;
    version: number;
    override: any;
    updateItem(itemSource: ItemWithRarityObject): Promise<void>;
}
declare type ItemWithRarityObject = ItemSourcePF2e & {
    data: {
        traits?: {
            rarity: string | {
                value: string;
            };
        };
    };
};
export {};
