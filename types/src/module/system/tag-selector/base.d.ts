/// <reference types="jquery" />
import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { SelectableTagField } from ".";
export interface TagSelectorOptions extends FormApplicationOptions {
    allowCustom?: boolean;
    /** Is the target data property a flat array rather than a values object? */
    flat?: boolean;
    customChoices?: Record<string, string>;
}
export declare abstract class TagSelectorBase<TDocument extends ActorPF2e | ItemPF2e = ActorPF2e | ItemPF2e> extends FormApplication<TDocument> {
    choices: Record<string, string>;
    flat: boolean;
    objectProperty: string;
    constructor(object: TDocument, options?: Partial<TagSelectorOptions>);
    protected abstract get configTypes(): readonly SelectableTagField[];
    static override: any;
    get defaultOptions(): TagSelectorOptions;
    protected abstract override: any;
    _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
    override: any;
    activateListeners($html: JQuery): void;
    /**
     * Builds an object of all keys of this.configTypes from CONFIG.PF2E
     * @returns An object of all key and translated value pairs sorted by key
     */
    private getChoices;
    /** Localize and sort choices */
    protected sortChoices(choices: Record<string, string>): Record<string, string>;
}
export interface TagSelectorBase {
    options: FormApplicationOptions;
}
