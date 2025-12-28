# 📅 Eivilux - After Calendar

Welcome to the Eivilux After Calendar project!

This interactive web app offers a special calendar from **December 29th to January 2nd**. Each day, a new box unlocks to reveal an exclusive image or content. On January 1st, discover a special audio podcast to start the year!

## Features

- Displays days from December 29th to January 2nd
- Boxes unlock according to the real date
- Each day reveals an image (jpg, png, jpeg, webp, gif)
- January 1st: reveals an audio podcast with a special message
- Optimized deployment for **GitHub Pages** (automatic path handling)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/eivilux/eivilux-calendrier-apres.git
   cd eivilux-calendrier-apres
   ```
2. Install dependencies:
   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:
```sh
pnpm dev
# or
npm run dev
# or
yarn dev
```

### Build & Deploy

To build for production (optimized for GitHub Pages):
```sh
pnpm build
# or
npm run build
# or
yarn build
```
The static site will be generated in the `build/` directory.

#### Static Assets
- Place images in `static/images/`
- Place the podcast audio in `static/audio/`

### GitHub Pages
The app is configured to work out-of-the-box with GitHub Pages. Paths are automatically set for the `/eivilux-calendrier-apres` base.

## Contributing

Feel free to open an issue or pull request to suggest ideas, images, or podcasts.

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

## Contact

For questions, suggestions, or partnership requests, open an **issue** or contact us via the Eivilux project channels.

---

*Made with ❤️ by the Eivilux community*
