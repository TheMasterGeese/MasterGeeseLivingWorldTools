import { ContainerPF2e, ItemPF2e } from "@item";
import { PhysicalItemData, TraitChatData } from "@item/data";
import { CoinsPF2e } from "@item/physical/helpers";
import { Rarity, Size } from "@module/data";
import { UserPF2e } from "@module/user";
import { Bulk } from "./bulk";
import { IdentificationStatus, ItemCarryType, MystifiedData, PhysicalItemTrait, Price } from "./data";
import { PreciousMaterialGrade, PreciousMaterialType } from "./types";
export declare abstract class PhysicalItemPF2e extends ItemPF2e {
    private _container;
    get level(): number;
    get rarity(): Rarity;
    get traits(): Set<PhysicalItemTrait>;
    get quantity(): number;
    get size(): Size;
    get isEquipped(): boolean;
    get carryType(): ItemCarryType;
    get handsHeld(): number;
    get isHeld(): boolean;
    get price(): Price;
    /** The monetary value of the entire item stack */
    get assetValue(): CoinsPF2e;
    get identificationStatus(): IdentificationStatus;
    get isIdentified(): boolean;
    get isAlchemical(): boolean;
    get isMagical(): boolean;
    get isInvested(): boolean | null;
    get isCursed(): boolean;
    get isTemporary(): boolean;
    get isDamaged(): boolean;
    get material(): {
        precious: {
            type: PreciousMaterialType;
            grade: PreciousMaterialGrade;
        } | null;
    };
    get isInContainer(): boolean;
    get isStowed(): boolean;
    /** Get this item's container, returning null if it is not in a container */
    get container(): Embedded<ContainerPF2e> | null;
    /** Returns the bulk of this item and all sub-containers */
    get bulk(): Bulk;
    get activations(): {
        id: string;
        description: {
            value: string;
        };
        actionCost: import("../data/base").ActionCost;
        components: {
            command: boolean;
            envision: boolean;
            interact: boolean;
            cast: boolean;
        };
        frequency?: import("../data/base").Frequency | undefined;
        traits: import("@module/data").ValuesList<"open" | "secret" | "move" | "time" | "scroll" | "hex" | "android" | "consumable" | "class" | "abjuration" | "conjuration" | "divination" | "enchantment" | "evocation" | "illusion" | "necromancy" | "transmutation" | "arcane" | "divine" | "occult" | "primal" | "positive" | "negative" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "force" | "chaotic" | "lawful" | "good" | "evil" | "mental" | "poison" | "air" | "earth" | "light" | "magical" | "water" | "splash" | "auditory" | "curse" | "detection" | "disease" | "emotion" | "healing" | "inhaled" | "olfactory" | "polymorph" | "possession" | "scrying" | "sleep" | "visual" | "alchemist" | "barbarian" | "bard" | "champion" | "cleric" | "druid" | "fighter" | "gunslinger" | "inventor" | "investigator" | "magus" | "monk" | "oracle" | "psychic" | "ranger" | "rogue" | "sorcerer" | "summoner" | "swashbuckler" | "thaumaturge" | "witch" | "wizard" | "darkness" | "death" | "skill" | "general" | "archetype" | "circus" | "summon" | "amp" | "attack" | "aura" | "beast" | "cantrip" | "composition" | "concentrate" | "consecration" | "contingency" | "cursebound" | "dream" | "eidolon" | "extradimensional" | "fear" | "fortune" | "fungus" | "incapacitation" | "incarnate" | "incorporeal" | "linguistic" | "litany" | "metamagic" | "mindless" | "misfortune" | "morph" | "nonlethal" | "plant" | "prediction" | "psyche" | "revelation" | "shadow" | "stance" | "summoned" | "teleportation" | "true-name" | "radiation" | "alchemical" | "catalyst" | "clockwork" | "contact" | "cursed" | "drug" | "elixir" | "fey" | "fulu" | "gadget" | "infused" | "ingested" | "injury" | "kobold" | "mechanical" | "mutagen" | "oil" | "potion" | "precious" | "snare" | "structure" | "talisman" | "trap" | "virulent" | "wand" | "additive1" | "additive2" | "additive3" | "aftermath" | "dedication" | "deviant" | "downtime" | "evolution" | "esoterica" | "exploration" | "finisher" | "flourish" | "lineage" | "manipulate" | "mindshift" | "modification" | "multiclass" | "oath" | "pervasive-magic" | "press" | "rage" | "reckless" | "reflection" | "social" | "spellshot" | "stamina" | "tandem" | "unstable" | "vigilante" | "half-elf" | "half-orc" | "aasimar" | "aberration" | "anadi" | "aphorite" | "automaton" | "azarketi" | "beastkin" | "catfolk" | "changeling" | "conrasu" | "dhampir" | "duskwalker" | "dwarf" | "elf" | "fetchling" | "fleshwarp" | "ganzi" | "geniekin" | "gnoll" | "gnome" | "goblin" | "goloma" | "grippli" | "halfling" | "hobgoblin" | "human" | "ifrit" | "kitsune" | "leshy" | "lizardfolk" | "orc" | "oread" | "poppet" | "ratfolk" | "shisk" | "shoony" | "skeleton" | "sprite" | "strix" | "suli" | "sylph" | "tengu" | "tiefling" | "undine">;
        componentsLabel: string;
    }[];
    /** Generate a list of strings for use in predication */
    override: any;
    getRollOptions(prefix?: string): string[];
    override: any;
    prepareBaseData(): void;
    /** Refresh certain derived properties in case of special data preparation from subclasses */
    override: any;
    prepareDerivedData(): void;
    override: any;
    prepareSiblingData(this: Embedded<PhysicalItemPF2e>): void;
    /** Can the provided item stack with this item? */
    isStackableWith(item: PhysicalItemPF2e): boolean;
    getMystifiedData(status: IdentificationStatus, _options?: Record<string, boolean>): MystifiedData;
    override: any;
    getChatData(): Record<string, unknown>;
    setIdentificationStatus(status: IdentificationStatus): Promise<void>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    /** Include mystification-related rendering instructions for views that will display this data. */
    protected override: any;
    traitChatData(dictionary: Record<string, string>): TraitChatData[];
    /** Set to unequipped upon acquiring */
    protected override: any;
    _preCreate(data: PreDocumentId<this["data"]["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    protected override: any;
    _preUpdate(changed: DeepPartial<this["data"]["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
export interface PhysicalItemPF2e {
    readonly data: PhysicalItemData;
}
