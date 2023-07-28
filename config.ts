import * as pulumi from "@pulumi/pulumi";
import { Port } from "./utils";

const config = new pulumi.Config();

interface ServerConfig {
    type: string,
    location: string
}

interface DockerConfig {
    image: string,
    ports: Port[],
}

interface GameConfig {
    name?: string,
    password?: string,
    map?: string,
    maxPlayers?: number,
    admin?: string
}

export const server = config.requireObject<ServerConfig>("server");
export const game = config.requireObject<GameConfig>("game");
export const docker = {...config.requireObject<DockerConfig>("docker"), ...{
    envs: {
        "SERVER_NAME": game.name,
        "SV_PASSWORD": game.password,
        "MAP": game.map,
        "MAXPLAYERS":  game.maxPlayers,
        "ADMIN_STEAM": game.admin,
    }}};
