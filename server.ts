import * as hcloud from "@pulumi/hcloud";
import * as config from "./config";
import { firewall } from "./firewall";
import * as keys from "./keys";
import { resource } from "./utils";

export const server = new hcloud.Server(resource("server"), {
    serverType: config.server.type,
    image: "docker-ce",
    location: config.server.location,
    sshKeys: [keys.sshKey.id],
    firewallIds: [firewall.id.apply(parseInt)],
});
