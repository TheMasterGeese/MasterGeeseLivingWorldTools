/// <reference types="jquery" />
import { KitPF2e } from "@item/kit";
import { CoinsPF2e } from "@item/physical/helpers";
import { ItemSheetPF2e } from "../sheet/base";
/**
 * @category Other
 */
export declare class KitSheetPF2e extends ItemSheetPF2e<KitPF2e> {
    static override: any;
    get defaultOptions(): DocumentSheetOptions;
    override: any;
    getData(options?: Partial<DocumentSheetOptions>): Promise<{
        type: string;
        priceString: CoinsPF2e;
        hasSidebar: boolean;
        sidebarTemplate: () => string;
        hasDetails: boolean;
        detailsTemplate: () => string;
        rarity: {
            common: string;
            uncommon: string;
            rare: string;
            unique: string;
        };
        traits: import("@module/sheet/helpers").SheetOptions;
        itemType: string | null;
        item: import("./data").KitData;
        data: import("./data").KitSystemSource;
        isPhysical: boolean;
        user: {
            isGM: boolean;
        };
        enabledRulesUI: boolean;
        ruleEditing: boolean;
        ruleSelection: {
            selected: string | null;
            types: Record<string, string>;
        };
        ruleElements: {
            template: string;
            index: number;
            rule: import("../../rules/rule-element/data").RuleElementSource;
        }[];
        cssClass: string;
        editable: boolean;
        document: KitPF2e;
        limited: boolean;
        options: FormApplicationOptions;
        owner: boolean;
        title: string;
    }>;
    protected override: any;
    _onDrop(event: ElementDragEvent): Promise<void>;
    removeItem(event: JQuery.ClickEvent): Promise<KitPF2e>;
    override: any;
    activateListeners($html: JQuery): void;
    protected override: any;
    _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
