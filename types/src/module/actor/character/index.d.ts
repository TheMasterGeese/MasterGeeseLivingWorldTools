import { CreaturePF2e, FamiliarPF2e } from "@actor";
import { Abilities, CreatureSpeeds, LabeledSpeed, MovementType } from "@actor/creature/data";
import { AttackItem, AttackRollContext, CreatureUpdateContext, StrikeRollContext, StrikeRollContextParams } from "@actor/creature/types";
import { CharacterSource } from "@actor/data";
import { StatisticModifier } from "@actor/modifiers";
import { AbilityString } from "@actor/types";
import { AncestryPF2e, BackgroundPF2e, ClassPF2e, DeityPF2e, FeatPF2e, HeritagePF2e, ItemPF2e, WeaponPF2e } from "@item";
import { ItemSourcePF2e, ItemType } from "@item/data";
import { ActiveEffectPF2e } from "@module/active-effect";
import { UserPF2e } from "@module/user";
import { RollParameters } from "@system/rolls";
import { CraftingEntry, CraftingFormula } from "./crafting";
import { AuxiliaryAction, BaseWeaponProficiencyKey, CharacterData, CharacterStrike, WeaponGroupProficiencyKey } from "./data";
import { CharacterFeats } from "./feats";
import { CharacterHitPointsSummary, CharacterSkills, CreateAuxiliaryParams } from "./types";
declare class CharacterPF2e extends CreaturePF2e {
    /** Core singular embeds for PCs */
    ancestry: Embedded<AncestryPF2e> | null;
    heritage: Embedded<HeritagePF2e> | null;
    background: Embedded<BackgroundPF2e> | null;
    class: Embedded<ClassPF2e> | null;
    deity: Embedded<DeityPF2e> | null;
    /** A cached reference to this PC's familiar */
    familiar: FamiliarPF2e | null;
    feats: CharacterFeats;
    pfsBoons: FeatPF2e[];
    deityBoonsCurses: FeatPF2e[];
    override: any;
    get allowedItemTypes(): (ItemType | "physical")[];
    get keyAbility(): AbilityString;
    /** This PC's ability scores */
    get abilities(): Abilities;
    override: any;
    get hitPoints(): CharacterHitPointsSummary;
    override: any;
    get skills(): CharacterSkills;
    get heroPoints(): {
        value: number;
        max: number;
    };
    getCraftingFormulas(): Promise<CraftingFormula[]>;
    getCraftingEntries(): Promise<CraftingEntry[]>;
    getCraftingEntry(selector: string): Promise<CraftingEntry | null>;
    performDailyCrafting(): Promise<void>;
    /** @deprecated */
    insertFeat(feat: FeatPF2e, categoryId: string, slotId?: string): Promise<ItemPF2e[]>;
    /** If one exists, prepare this character's familiar */
    override: any;
    prepareData(): void;
    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    override: any;
    prepareBaseData(): void;
    /** After AE-likes have been applied, set numeric roll options */
    override: any;
    prepareEmbeddedDocuments(): void;
    /**
     * Immediately after boosts from this PC's ancestry, background, and class have been acquired, set ability scores
     * according to them.
     */
    override: any;
    prepareDataFromItems(): void;
    override: any;
    prepareDerivedData(): void;
    private setAbilityScores;
    private setAbilityModifiers;
    /** Set roll operations for ability scores, proficiency ranks, and number of hands free */
    protected setNumericRollOptions(): void;
    private prepareSaves;
    private prepareSkills;
    override: any;
    prepareSpeed(movementType: "land"): CreatureSpeeds;
    override: any;
    prepareSpeed(movementType: Exclude<MovementType, "land">): LabeledSpeed & StatisticModifier;
    override: any;
    prepareSpeed(movementType: MovementType): CreatureSpeeds | (LabeledSpeed & StatisticModifier);
    override: any;
    prepareFeats(): void;
    /** Create an "auxiliary" action, an Interact or Release action using a weapon */
    createAuxAction({ weapon, action, purpose, hands }: CreateAuxiliaryParams): AuxiliaryAction;
    /** Prepare this character's strike actions */
    prepareStrikes({ includeBasicUnarmed }?: {
        includeBasicUnarmed?: boolean | undefined;
    }): CharacterStrike[];
    /** Prepare a strike action from a weapon */
    private prepareStrike;
    getStrikeDescription(weapon: WeaponPF2e): {
        description: string;
        criticalSuccess: string;
        success: string;
    };
    /** Possibly modify this weapon depending on its */
    protected override: any;
    getStrikeRollContext<I extends AttackItem>(params: StrikeRollContextParams<I>): StrikeRollContext<this, I>;
    /** Create attack-roll modifiers from weapon traits */
    override: any;
    getAttackRollContext<I extends AttackItem>(params: StrikeRollContextParams<I>): AttackRollContext<this, I>;
    consumeAmmo(weapon: WeaponPF2e, args: RollParameters): boolean;
    /** Prepare stored and synthetic martial proficiencies */
    prepareMartialProficiencies(): void;
    /** Toggle the invested state of an owned magical item */
    toggleInvested(itemId: string): Promise<boolean>;
    /** Add a proficiency in a weapon group or base weapon */
    addCombatProficiency(key: BaseWeaponProficiencyKey | WeaponGroupProficiencyKey): Promise<void>;
    removeCombatProficiency(key: BaseWeaponProficiencyKey | WeaponGroupProficiencyKey): Promise<void>;
    /** Remove any features linked to a to-be-deleted ABC item */
    override: any;
    protected override: any;
    _preUpdate(changed: DeepPartial<CharacterSource>, options: CreatureUpdateContext<this>, user: UserPF2e): Promise<void>;
    /** Perform heritage and deity deletions prior to the creation of new ones */
    preCreateDelete(toCreate: PreCreate<ItemSourcePF2e>[]): Promise<void>;
    /** Toggle between boost-driven and manual management of ability scores */
    toggleAbilityManagement(): Promise<void>;
    /** Toggle between boost-driven and manual management of ability scores */
    toggleVoluntaryFlaw(): Promise<void>;
}
interface CharacterPF2e {
    readonly data: CharacterData;
    deleteEmbeddedDocuments(embeddedName: "ActiveEffect", dataId: string[], context?: DocumentModificationContext): Promise<ActiveEffectPF2e[]>;
    deleteEmbeddedDocuments(embeddedName: "Item", dataId: string[], context?: DocumentModificationContext): Promise<ItemPF2e[]>;
    deleteEmbeddedDocuments(embeddedName: "ActiveEffect" | "Item", dataId: string[], context?: DocumentModificationContext): Promise<ActiveEffectPF2e[] | ItemPF2e[]>;
}
export { CharacterPF2e };
