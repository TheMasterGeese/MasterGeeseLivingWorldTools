import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration618MigrateItemImagePaths extends MigrationBase {
    static override: any;
    version: number;
    readonly IMAGE_PATHS: Record<string, ImagePath>;
    override: any;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
