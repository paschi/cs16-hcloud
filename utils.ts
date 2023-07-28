import * as pulumi from "@pulumi/pulumi";

export interface Port {
    port: number,
    protocol: string
}

export function resource(name: string) {
    return pulumi.getProject() + "-" + pulumi.getStack() + "-" + name;
}
