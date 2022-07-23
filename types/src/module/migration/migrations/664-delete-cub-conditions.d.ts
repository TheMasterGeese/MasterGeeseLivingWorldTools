import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Delete conditions originating from the Combat Utility Belt module */
export declare class Migration664DeleteCUBConditions extends MigrationBase {
    static override: any;
    version: number;
    override: any;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
}
