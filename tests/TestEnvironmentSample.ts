/**
 *  This file exists to hold the equivalent values in the environment variables of the same name somwhere that the integration tests can
 *  access them while running. The tests run on a webpage, so the environment variables in the node.js environment would be unavailable.
 * 
 *  May consider refactoring this later to somehow introduce these environment variables into the page.
 */ 
 export class TestEnvironment {
    public static GM_DISCORD_ID = "Fill out with the testworld GM user's Discord ID."
    public static EXPECTED_VALUE = "Fill out with an expected value.";
}