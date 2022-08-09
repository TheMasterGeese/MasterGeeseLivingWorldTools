

let gameUsers: StoredDocument<User>[]
let foundryGame: Game;

function getGame(): Game {
    return game;
}

Hooks.once("ready", function () {
    gameUsers = (game.users).contents;
});

Hooks.once("init", function () {
    foundryGame = getGame();
    // add settings option for URL of Discord Webhook
    foundryGame.settings.register("sample-module", "sampleSetting", {
        name: foundryGame.i18n.localize("title declared in lang file"),
        hint: foundryGame.i18n.localize("hint declared in lang file"),
        // Add more options as needed.
    });
});

Hooks.on("sampleHook", function (sampleParameter : any) {
    // add a hook listener for an event thrown by foundry or a module (including this one).
    sampleFunction(sampleParameter);
});

/**
 * Performs a sample operation
 * 
 * @param sampleParameter The message to forward to Discord
 * 
 * @returns A sample value
 * 
 * @throws A sample error when something happens
 */
function sampleFunction(sampleParameter: any) : number {
    return (+sampleParameter + 7);
}