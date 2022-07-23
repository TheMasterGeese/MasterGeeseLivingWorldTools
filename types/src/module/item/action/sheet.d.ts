/// <reference types="jquery" />
import { ActionItemPF2e } from "@item/action";
import { ItemSheetDataPF2e } from "@item/sheet/data-types";
import { SheetOptions } from "@module/sheet/helpers";
import { ItemSheetPF2e } from "../sheet/base";
export declare class ActionSheetPF2e extends ItemSheetPF2e<ActionItemPF2e> {
    override: any;
    getData(options?: Partial<DocumentSheetOptions>): Promise<ActionSheetData>;
    override: any;
    activateListeners($html: JQuery<HTMLElement>): void;
}
interface ActionSheetData extends ItemSheetDataPF2e<ActionItemPF2e> {
    categories: ConfigPF2e["PF2E"]["actionCategories"];
    actionTypes: ConfigPF2e["PF2E"]["actionTypes"];
    actionsNumber: ConfigPF2e["PF2E"]["actionsNumber"];
    actionTraits: ConfigPF2e["PF2E"]["actionTraits"];
    frequencies: ConfigPF2e["PF2E"]["frequencies"];
    skills: ConfigPF2e["PF2E"]["skillList"];
    proficiencies: ConfigPF2e["PF2E"]["proficiencyLevels"];
    traits: SheetOptions;
}
export {};
