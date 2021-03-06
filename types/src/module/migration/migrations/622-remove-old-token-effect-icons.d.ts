import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
export declare class Migration622RemoveOldTokenEffectIcons extends MigrationBase {
    static override: any;
    version: number;
    override: any;
    updateActor(actorData: ActorWithTokenEffect): Promise<void>;
    override: any;
    updateToken(tokenData: foundry.data.TokenSource): Promise<void>;
}
declare type TokenEffectsFlag = {
    pf2e?: {
        token?: {
            effects?: Record<string, unknown>;
        };
    };
};
declare type ActorWithTokenEffect = ActorSourcePF2e & {
    token: ActorSourcePF2e["token"] & {
        effects?: string[];
        "-=effects"?: null;
        flags: TokenEffectsFlag;
    };
    flags: TokenEffectsFlag;
};
export {};
