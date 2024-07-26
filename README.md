# express-react-monorepo

An API and React app served by a single instance of Express

## Notes

I'm using this as a base for a series of full-stack applications I'm creating for my portfolio. It doesn't look like much, but it's set up to enable me to create secure & fully fledged MERN applications.

# Features

-  Stateless Express server

   -  Written in TypeScript
   -  Serves an API at `/api`
   -  Currently uses hardcoded sign in values
   -  Issues a JWT cookie on sign in
   -  The client can't read or do anything with the JWT except pass it back with subsequent requests
   -  Also serves the static React app at `/`

-  React app

   -  Written in TypeScript
   -  Uses React Router
   -  Uses an AuthContext to store the `isAuthenticated` state globally
   -  Makes requests to `/api/validate-token` to update the state
   -  Uses Axios for requests
   -  Layout styled with Tailwind

Environment Variable handling
_In development_

-  I'm using one `.env` file for both parts of the site
-  Back-end variables are prefixed with `EXPRESS_`
   -  This is for clarity only
-  Front-end variables are prefixed with `VITE_`
   -  This is essential for the Vite bundler to be able to use them
-  Both parts of the monorepo have an `environementChecks` file
-  This is where you declare essential variables and check they can be accessed by the TypeScript complier (for the back-end) and Vite (for the front-end)
-  This will throw an error if any aren't set.
-  The whole point of this is to make deployment to Fly easy.

-  Deployed with Fly

-  The deploy script in `root/package.json`: `pnpm run deploy` first runs `/ops/checkVariables.js`, which will throw an error if anything is still set to 'production'
-  This is annoyingly manual for my taste, but setting environment variables is currently quite difficult with Fly, and this gives me peace of mind that I'm not wasting build time & money
-  Next the TypeScript Express server gets compiled into `dist/server`
-  Then the React project is built into `dist/client`
-  Then the `.env` file is scraped, and the variables are added to the `fly deploy` command
-  You'll be able to see all environment variables logged to the Fly console
-  The site will work beautifully
