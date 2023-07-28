import { local } from "@pulumi/command";
import * as hcloud from "@pulumi/hcloud";
import * as pulumi from "@pulumi/pulumi";
import * as tls from "@pulumi/tls";
import { resource } from "./utils";

const privateKey = new tls.PrivateKey(resource("private-key"), {
    algorithm: "ED25519",
});

export const privateKeyPath = pulumi.interpolate`private-key-${privateKey.id}`;
new local.Command(resource("private-key-file"), {
    create: pulumi.interpolate`echo "${privateKey.privateKeyOpenssh}" > ${privateKeyPath} && chmod 600 ${privateKeyPath}`,
    delete: pulumi.interpolate`rm -f ${privateKeyPath}`,
    triggers: [privateKey.privateKeyOpenssh],
});

export const sshKey = new hcloud.SshKey(resource("ssh-key"), {
    publicKey: privateKey.publicKeyOpenssh,
});
