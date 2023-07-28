import * as config from "./config";
import "./docker";
import { server } from "./server";

export const ip = server.ipv4Address;
export const password = config.game.password;
