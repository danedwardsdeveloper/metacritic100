# MetaCritic100

~ [Live site](https://metacritic100.com/) ~

Track your progress through MetaCritic's top 100 films with this MERN stack web application. Deployed with [Fly.io](https://fly.io/).

![MetaCritic100 desktop screenshot](https://raw.githubusercontent.com/danedwardsdeveloper/metacritic100/main/screenshot.webp)

## Features

-  Track viewed films from MetaCritic's top 100 list
-  Responsive design with Pinterest-style layout
-  Stateless user authentication and account management with an http-only same-site JWT cookie
-  Dark/Light mode
-  Films data is stored client-side to minimise unnecessary http requests
-  Local storage is used to track the filmSeen status of signed-out users
-  Local storage merges with MongoDB user document on sign in/ account creation

## Tech Stack

-  Express
   -  Written in TypeScript
-  MongoDB
-  React 18
   -  Packaged with Vite & SWC
   -  Written in TypeScript
   -  React Helmet Async for metadata
-  Tailwind

## Roadmap

### High Priority

-  [ ] Implement `/delete-account` route
-  [ ] Create summary page for social media sharing
-  [ ] Optimize Lighthouse score
-  [ ] Add H1 heading on the home page (Somehow?)

### UI/UX Improvements

-  [ ] Enhance FilmCard styling
-  [ ] Implement scroll-to-top functionality
-  [ ] Add GSAP animations
-  [ ] Create shimmery skeleton loaders with intentional delay
-  [ ] Implement filter options (language, year, genre, runtime, age rating)
-  [ ] Develop search modal
-  [ ] Add responsive navbar behavior (squeeze on scroll)

### Component Refactoring

-  [ ] Split MenuBar into smaller components:
   -  Main navigation
   -  Mobile navigation
   -  Film count

### New Features

-  [ ] Implement global error handling
-  [ ] Add Winston for logging
-  [ ] Integrate Simple Analytics
-  [ ] Create a logo
-  [ ] Implement caching policy
-  [ ] Add multi-language support
-  [ ] Create a "Reset all films" feature
-  [ ] Allow users to write notes / score each film

### FilmCard Enhancements

-  [ ] Add modal menu with links to:
   -  MetaCritic page
   -  Wikipedia page
   -  JustWatch

### Miscellaneous

-  [ ] Remove dead links from the Footer
-  [ ] Update Footer icon color
-  [ ] Icon colours in dark mode
-  [ ] Add "Site by Dan Edwards" credit

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
