import * as docker from "@pulumi/docker";
import * as pulumi from "@pulumi/pulumi";
import * as config from "./config";
import * as keys from "./keys";
import { server } from "./server";
import { resource } from "./utils";

const provider = new docker.Provider(resource("docker"), {
    host: pulumi.interpolate`ssh://${server.ipv4Address}`,
    sshOpts: [
        "-l", "root",
        "-i", keys.privateKeyPath,
        "-o", "StrictHostKeyChecking=no",
        "-o", "UserKnownHostsFile=/dev/null",
        "-o", "ConnectionAttempts=20",
    ],
});

const image = new docker.RemoteImage(resource("image"), {
    name: config.docker.image,
}, {
    provider: provider,
});

export const container = new docker.Container(resource("container"), {
    image: image.imageId,
    ports: config.docker.ports.map(p => ({
        internal: p.port,
        external: p.port,
        protocol: p.protocol,
    })),
    envs: Object.entries(config.docker.envs)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => pulumi.interpolate`${k}=${v}`),
}, {
    provider: provider,
});
