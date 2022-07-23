import { PhysicalItemSheetPF2e } from "@item/physical/sheet";
import { PhysicalItemSheetData } from "@item/sheet/data-types";
import { SheetOptions } from "@module/sheet/helpers";
import { EquipmentPF2e } from ".";
export declare class EquipmentSheetPF2e extends PhysicalItemSheetPF2e<EquipmentPF2e> {
    override: any;
    getData(options?: Partial<DocumentSheetOptions>): Promise<EquipmentSheetData>;
}
interface EquipmentSheetData extends PhysicalItemSheetData<EquipmentPF2e> {
    otherTags: SheetOptions;
}
export {};
