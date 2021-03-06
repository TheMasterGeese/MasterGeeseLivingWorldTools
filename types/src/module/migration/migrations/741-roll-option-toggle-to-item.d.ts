import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Move tracking of roll-option toggles to the rules themselves */
export declare class Migration741RollOptionToggleToItem extends MigrationBase {
    static override: any;
    version: number;
    override: any;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
