# Typescript + DO Functions Dev Environment Template

Unofficial, this is a template to be able to test locally, create a build, and deploy Digital Ocean Functions. Clone and modify as you wish!

## How to use?

1. First clone and install some dependencies
```
git clone git@github.com:deca-inc/dev-functions.git
pnpm install # or your favorite package manager
```

2. Create a function namespace in DigitalOcean then connect

```
doctl serverless connect
```

3. Deploy

```
pnpm launch
```

Check out the function live.

4. Local dev

The basics are:
- Run `pnpm dev` to start watching for changes
- Run `pnpm test` to run tests
- See `package.json scripts` for more options

5. Create new functions/routes

For each new route you need 2 entries:
- Update build.js
```
entryPoints: {
  "example/hello/index": "./src/functions/hello.ts",
  // .. NEW ENTRY POINTS HERE
},
```

- Update `src/localServer.ts`
```
const routes: Record<
  string,
  (event: ParsedWebEvent, context: DOContext) => Promise<FunctionResponse>
> = {
  "/example/hello": helloMain,
  // ADD NEW ROUTES HERE
};
```

6. Environment Variables
- Duplicate `.env.example` -> `.env`
- Add new variables into `.env` and in `project.yml` follow DO's guide for more info

NOTE: any variables in .env will get deployed if you run `pnpm launch`. For projects without build pipelines this is :chefskiss:. For projects with build pipelines some trial and error might be required here. (Untested) You should be able to add your environment variables into the environment and omit adding a .env.
