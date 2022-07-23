import type { ActorPF2e } from "@actor/base";
import { EncounterPF2e } from ".";
declare class CombatantPF2e<TActor extends ActorPF2e | null = ActorPF2e | null> extends Combatant<TActor> {
    get encounter(): EncounterPF2e | null;
    get defeated(): boolean;
    /** The round this combatant last had a turn */
    get roundOfLastTurn(): number | null;
    /** Can the user see this combatant's name? */
    get playersCanSeeName(): boolean;
    overridePriority(initiative: number): number | null;
    hasHigherInitiative(this: RolledCombatant, { than }: {
        than: RolledCombatant;
    }): boolean;
    override: any;
    prepareBaseData(): void;
    /** Toggle the defeated status of this combatant, applying or removing the overlay icon on its token */
    toggleDefeated(): Promise<void>;
    /**
     * Hide the tracked resource if the combatant represents a non-player-owned actor
     * @todo Make this a configurable with a metagame-knowledge setting
     */
    override: any;
    updateResource(): {
        value: number;
    } | null;
    override: any;
    _getInitiativeFormula(): string;
    /** Toggle the visibility of names to players */
    toggleNameVisibility(): Promise<void>;
    /** Send out a message with information on an automatic effect that occurs upon an actor's death */
    protected override: any;
    _onUpdate(changed: DeepPartial<this["data"]["_source"]>, options: DocumentUpdateContext<this>, userId: string): void;
}
declare type CombatantDataPF2e<T extends CombatantPF2e> = foundry.data.CombatantData<T> & {
    flags: {
        pf2e: {
            roundOfLastTurn: number | null;
            overridePriority: Record<number, number | undefined>;
        };
    };
};
interface CombatantPF2e<TActor extends ActorPF2e | null = ActorPF2e | null> extends Combatant<TActor> {
    readonly parent: EncounterPF2e | null;
    readonly data: CombatantDataPF2e<this>;
}
declare type RolledCombatant = Embedded<CombatantPF2e> & {};
export { CombatantPF2e, RolledCombatant };
