import { SpellPF2e } from "@item";
import { SpellcastingEntryPF2e } from ".";
export declare class SpellCollection extends Collection<Embedded<SpellPF2e>> {
    private entry;
    constructor(entry: Embedded<SpellcastingEntryPF2e>);
    get id(): string;
    get actor(): import("../../actor/base").ActorPF2e;
    /**
     * Adds a spell to this spellcasting entry, either moving it from another one if its the same actor,
     * or creating a new spell if its not.
     */
    addSpell(spell: SpellPF2e, targetLevel?: number): Promise<SpellPF2e | null>;
    /** Saves the prepared spell slot data to the spellcasting entry  */
    prepareSpell(spell: SpellPF2e, spellLevel: number, spellSlot: number): Promise<SpellcastingEntryPF2e>;
    /** Removes the spell slot and updates the spellcasting entry */
    unprepareSpell(spellLevel: number, spellSlot: number): Promise<SpellcastingEntryPF2e>;
    /** Sets the expended state of a spell slot and updates the spellcasting entry */
    setSlotExpendedState(spellLevel: number, spellSlot: number, isExpended: boolean): Promise<SpellcastingEntryPF2e>;
}
