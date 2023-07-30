import * as command from "@pulumi/command";
import * as pulumi from "@pulumi/pulumi";
import * as config from "./config";
import * as keys from "./keys";
import { server } from "./server";
import { resource } from "./utils";

const connection: command.types.input.remote.ConnectionArgs = {
    host: server.ipv4Address,
    user: "root",
    privateKey: keys.privateKey.privateKeyOpenssh,
    dialErrorLimit: 20,
};

const dockerPullCommand = new command.remote.Command(resource("docker-pull-command"), {
    connection: connection,
    create: pulumi.interpolate`docker image pull -q ${config.docker.image}`,
    delete: pulumi.interpolate`docker image rm -f ${config.docker.image}`,
    triggers: [connection.host],
});

const ports = pulumi.interpolate`${config.docker.ports
    .map(p => `-p ${p.port}:${p.port}/${p.protocol}`)
    .join(" ")}`;
const envs = pulumi.interpolate`${Object.entries(config.docker.envs)
    .filter(([,v]) => v !== undefined)
    .map(([k, v]) => `-e ${k}="${v}"`)
    .join(" ")}`;
new command.remote.Command(resource("docker-run-command"), {
    connection: connection,
    create: pulumi.interpolate`docker run -q -d --rm ${ports} ${envs} ${dockerPullCommand.stdout}`,
    delete: pulumi.interpolate`docker stop $(docker ps -q --filter ancestor=${dockerPullCommand.stdout})`,
    triggers: [connection.host],
});
