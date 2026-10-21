# TwitterGo Demo Client

Frontend React for the isolated, read-only TwitterGo demo.

- Demo: https://puricalvo.github.io/twitterGo-demo-client
- Demo API: https://twittergo-demo.cadesa.serv00.net
- API repository: https://github.com/puricalvo/twitterGo

The client is configured for the demo API and its MongoDB GridFS image endpoint. Public registration and data-changing actions are disabled for this demo. Demo login credentials are shared separately; never add passwords, API keys, or database connection strings to this repository.

## Local development

```sh
npm ci
npm start
```

## Build and deploy

```sh
npm run build
npm run deploy
```

GitHub Pages should serve the `gh-pages` branch at the demo URL above. The personal TwitterGo client and API use separate repositories and deployments.
