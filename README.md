# MetaCritic100

Track how many of MetaCritic's top 100 films you've seen with this MERN web app. Uses a stateless Express server to handle accounts.

# Current Task

-  [ ] Connect database

# To-Do List

-  [ ] Add static films data to the client to reduce unnecessary requests
-  [ ] Remove static films data from the database
-  [ ] Routes
   -  [ ] The only public routes are `/sign-in` and `/validate-token`
   -  [ ] `/protected/all` Returns an object with all the films, plus the 'seen' status, and any notes from the signed-in user. userId is supplied in the jwt cookie.
-  [ ]
