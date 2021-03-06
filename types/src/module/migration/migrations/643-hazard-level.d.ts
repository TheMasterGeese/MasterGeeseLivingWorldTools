import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Move hazard level property to the same position as other actor data */
export declare class Migration643HazardLevel extends MigrationBase {
    static override: any;
    version: number;
    override: any;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
}
