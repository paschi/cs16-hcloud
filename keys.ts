import * as hcloud from "@pulumi/hcloud";
import * as tls from "@pulumi/tls";
import { resource } from "./utils";

export const privateKey = new tls.PrivateKey(resource("private-key"), {
    algorithm: "ED25519",
});

export const sshKey = new hcloud.SshKey(resource("ssh-key"), {
    publicKey: privateKey.publicKeyOpenssh,
});
