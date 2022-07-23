/// <reference types="jquery" />
import { ItemPF2e } from "@item";
import { RuleElementSource } from "@module/rules";
import type * as TinyMCE from "tinymce";
import { ItemSheetDataPF2e } from "./data-types";
export declare class ItemSheetPF2e<TItem extends ItemPF2e> extends ItemSheet<TItem> {
    static override: any;
    get defaultOptions(): DocumentSheetOptions;
    /** Maintain selected rule element at the sheet level (do not persist) */
    private selectedRuleElementType;
    /** If we are currently editing an RE, this is the index */
    private editingRuleElementIndex;
    private ruleElementForms;
    get editingRuleElement(): RuleElementSource | null;
    override: any;
    getData(options?: Partial<DocumentSheetOptions>): Promise<any>;
    /** An alternative to super.getData() for subclasses that don't need this class's `getData` */
    protected getBaseData(options?: Partial<DocumentSheetOptions>): ItemSheetDataPF2e<TItem>;
    protected onTagSelector(event: JQuery.TriggeredEvent): void;
    /**
     * Get NPC attack effect options
     */
    protected getAttackEffectOptions(): Record<string, string>;
    private addDamageRoll;
    private deleteDamageRoll;
    override: any;
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    override: any;
    activateListeners($html: JQuery): void;
    /** Ensure the source description is edited rather than a prepared one */
    override: any;
    activateEditor(name: string, options?: Partial<TinyMCE.EditorSettings>, initialContent?: string): void;
    protected override: any;
    _getSubmitData(updateData?: Record<string, unknown>): Record<string, unknown>;
    /** Hide the sheet-config button unless there is more than one sheet option. */
    protected override: any;
    _getHeaderButtons(): ApplicationHeaderButton[];
    protected override: any;
    _canDragDrop(_selector: string): boolean;
    /** Tagify sets an empty input field to "" instead of "[]", which later causes the JSON parse to throw an error */
    protected override: any;
    _onSubmit(event: Event, { updateData, preventClose, preventRender }?: OnSubmitFormOptions): Promise<Record<string, unknown>>;
    protected override: any;
    _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
