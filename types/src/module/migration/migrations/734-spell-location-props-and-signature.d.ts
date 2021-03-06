import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Certain actor specific spell properties moved to spell.location such as signature */
export declare class Migration734SpellLocationPropsAndSignature extends MigrationBase {
    static override: any;
    version: number;
    override: any;
    updateActor(actor: ActorSourcePF2e): Promise<void>;
    override: any;
    updateItem(source: ItemSourcePF2e, actor?: ActorSourcePF2e): Promise<void>;
}
