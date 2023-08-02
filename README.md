<div align="center">

  # cs16-hcloud

  [![Steam][badge-steam]][uri-steam]
  [![Pulumi][badge-pulumi]][uri-pulumi]
  [![Hetzner][badge-hetzner]][uri-hetzner]

  *Dockerized **Counter-Strike 1.6** server running on **Hetzner Cloud** powered by **Pulumi**.*

</div>

## ⚡️ Getting Started

First, install [Pulumi][uri-pulumi-install] and [Node.js][uri-nodejs-install], if you have not already.

To be able to create resources in the Hetzner Cloud, you need to create an API token in your account and register it as an environment variable:
```shell
$ export HCLOUD_TOKEN=<YOUR_HCLOUD_ACCESS_TOKEN>
```

After that, login to your Pulumi account and create an active stack:
```shell
$ pulumi login
$ pulumi stack init <YOUR_PULUMI_STACK>
$ pulumi stack select <YOUR_PULUMI_STACK>
```

Once that is done, you can deploy the stack:
```shell
$ pulumi up
```

This will create all required resources and start the CS 1.6 docker container. The IP address of the server can be found in the outputs section of the `pulumi up` command.

After you're done playing, you can tear down the stack:
```shell
$ pulumi destroy
```

## ⚙️ Configuration

The server and game settings can also be configured by using the Pulumi CLI:
```shell
# Location and type of cloud server to use.
# See Hetzner documentation for available options.
pulumi config set --path "server.location" "fsn1"
pulumi config set --path "server.type" "cx21"

# CS 1.6 game settings.
pulumi config set --path "game.name" "<GAME_NAME>"
pulumi config set --path "game.password" "<GAME_PASSWORD>" --secret
pulumi config set --path "game.map" "<START_MAP>"
pulumi config set --path "game.maxPlayers" "<MAX_PLAYER_COUNT>"
pulumi config set --path "game.admin" "<ADMIN_STEAM_ID>" --secret
```

Using `--secret` ensures that those values are getting encrypted in your stack configuration.

[badge-hetzner]: https://img.shields.io/badge/Hetzner-D50C2D.svg?style=for-the-badge&logo=Hetzner&logoColor=white
[badge-pulumi]: https://img.shields.io/badge/Pulumi-8A3391.svg?style=for-the-badge&logo=Pulumi&logoColor=white
[badge-steam]: https://img.shields.io/badge/Steam-000000.svg?style=for-the-badge&logo=Steam&logoColor=white
[uri-hetzner]: https://www.hetzner.com
[uri-nodejs-install]: https://nodejs.org/en/download
[uri-pulumi]: https://www.pulumi.com
[uri-pulumi-install]: https://www.pulumi.com/docs/install
[uri-steam]: https://www.steampowered.com
