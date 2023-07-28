import * as hcloud from "@pulumi/hcloud";
import * as config from "./config";
import { Port, resource } from "./utils";

const sshPort: Port = {
    port: 22,
    protocol: "tcp",
};

export const firewall = new hcloud.Firewall(resource("firewall"), {
    rules: config.docker.ports
        .concat([sshPort])
        .map(p => ({
            direction: "in",
            port: p.port.toString(),
            protocol: p.protocol,
            sourceIps: [
                "0.0.0.0/0",
                "::/0",
            ],
        })),
});
