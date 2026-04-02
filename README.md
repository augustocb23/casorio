# Casório

Pequeno projeto em Node/TypeScript para redirecionar o link de transmissão do casamento.
A ideia era fornecer um endereço fixo que pode ser transformado em QR Code e enviado nos convites.

## Definição do ambiente

O projeto foi feito em [Express](https://www.npmjs.com/package/express) e [RoutingControllers](https://www.npmjs.com/package/routing-controllers).
Foi executado usando [Amazon Lightsail](https://aws.amazon.com/pt/lightsail). Esse repositório estava originalmente no BitBucket, portanto a [pipeline](./bitbucket-pipelines.yml) foi criada no formato do serviço.

Como o projeto ficou no ar por apenas alguns dias, a senha para atualizar o link é fixa, definida diretamente no arquivo [environments](./src/environments/environment.ts).
O link é armazenado em um arquivo chamado `meeting.json` na raiz do projeto.
