/// <reference types="jquery" />
import { StatisticModifier } from "@actor/modifiers";
import { RollSubstitution } from "@module/rules/synthetics";
import { CheckRollContext } from "./rolls";
/**
 * Dialog for excluding certain modifiers before rolling a check.
 * @category Other
 */
export declare class CheckModifiersDialog extends Application {
    /** The check which is being edited. */
    check: StatisticModifier;
    /** Relevant context for this roll, like roll options. */
    context: CheckRollContext;
    /** A Promise resolve method */
    resolve: (value: boolean) => void;
    /** Pre-determined D20 roll results */
    substitutions: RollSubstitution[];
    /** Has the promise been resolved? */
    isResolved: boolean;
    constructor(check: StatisticModifier, resolve: (value: boolean) => void, context?: CheckRollContext);
    override: any;
    getData(): object;
    override: any;
    activateListeners($html: JQuery): void;
    override: any;
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    onAddModifier(event: JQuery.ClickEvent): Promise<void>;
    onChangeRollMode(event: JQuery.ChangeEvent): void;
    protected override: any;
    _getHeaderButtons(): ApplicationHeaderButton[];
}
