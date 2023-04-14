import { doGet } from "../doGet";

// Comment `global.doGet = doGet;` to see that the global is not produced.
// @ts-ignore needed for GAS, while keeping ES2022
global.doGet = doGet;
