
# AI Financial Reporting Platform - "Insightful"

This project is a modern, AI-enhanced financial reporting platform designed to help users create reports, forecasts, dashboards, and consolidations with insightful, data-driven assistance. It's built with Next.js, React, ShadCN UI, Tailwind CSS, and Genkit for AI functionalities.

## ✨ Features

*   **Interactive Landing Page:** A visually appealing single-page application.
*   **AI-Powered Keyword Insights:** Hover over keywords like "reports" or "dashboards" to see contextual information and relevant mini-dashboards.
*   **Dynamic Sections:** Multiple sections including:
    *   **Home:** Hero section with animated title and call-to-actions.
    *   **Services:** Showcasing core offerings with animated cards.
    *   **Features:** Highlighting key platform capabilities.
    *   **Why Us?:** A comparative bar chart with filtering options to demonstrate advantages over competitors.
    *   **Testimonials:** Client feedback displayed in an interactive carousel.
    *   **Contact:** A clear call-to-action to get in touch.
*   **Smooth Scrolling & Navigation:** A fixed header with links that smoothly navigate to different page sections.
*   **Scroll-Triggered Animations:** Sections and elements animate into view as the user scrolls.
*   **Ripple Effect:** Interactive click effect on navigation links.
*   **Dark/Light Mode Toggle:** Easily switch between themes, with preference saved in local storage.
*   **Interactive Loader:** A custom loading screen with a starry background, progress bar, and interactive ripple effects.
*   **Responsive Design:** Optimized for various screen sizes from mobile to desktop.
*   **Placeholder AI Image Generation:** (Previously implemented for testimonials) Demonstrates capability for dynamic image generation using Genkit.

## 🛠️ Tech Stack

*   **Frontend:**
    *   Next.js (App Router)
    *   React
    *   TypeScript
*   **UI & Styling:**
    *   ShadCN UI Components
    *   Tailwind CSS
    *   Lucide Icons
    *   Recharts (for charts)
    *   Embla Carousel (for testimonial carousel)
*   **Generative AI:**
    *   Genkit (for AI flows, e.g., contextual insights, image generation)
    *   Google AI (via Genkit, e.g., Gemini models)
*   **Development Tools:**
    *   ESLint (for linting)
    *   Prettier (implicitly, for code formatting if set up)

##  Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js) or [Yarn](https://yarnpkg.com/)

## 🚀 Getting Started

Follow these steps to get the project running on your local machine:

1.  **Clone the Repository:**
    If the project is hosted on GitHub, you can clone it using:
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```
    Replace `https://github.com/your-username/your-repository-name.git` with the actual URL of your GitHub repository.

2.  **Install Dependencies:**
    Navigate to the project directory and install the necessary dependencies:
    ```bash
    npm install
    ```
    or if you prefer Yarn:
    ```bash
    yarn install
    ```

3.  **Set Up Environment Variables (if any):**
    This project uses Genkit, which might require API keys for AI models (e.g., Google AI Studio API Key for Gemini).
    *   Create a `.env.local` file in the root of your project by copying the `.env` (if it exists and is empty) or `.env.example` (if provided).
    *   Add any required environment variables. For example, if you're using Google AI:
        ```env
        GOOGLE_API_KEY=your_google_ai_api_key_here
        ```
    *   Refer to the Genkit and Google AI documentation for details on obtaining API keys.

4.  **Run the Development Server:**
    Start the Next.js development server:
    ```bash
    npm run dev
    ```
    or with Yarn:
    ```bash
    yarn dev
    ```
    This will typically start the application on `http://localhost:9002` (as per your `package.json`).

5.  **Run the Genkit Development Server (for AI features):**
    Genkit flows run in a separate development server. Open a new terminal window/tab and run:
    ```bash
    npm run genkit:dev
    ```
    or with Yarn:
    ```bash
    yarn genkit:dev
    ```
    This usually starts the Genkit development environment, often on `http://localhost:4000`.

    You should now have both the Next.js frontend and the Genkit backend running.

## 📜 Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev` or `yarn dev`: Runs the Next.js app in development mode with Turbopack.
*   `npm run genkit:dev` or `yarn genkit:dev`: Starts the Genkit development server for AI flows.
*   `npm run genkit:watch` or `yarn genkit:watch`: Starts the Genkit development server with watch mode.
*   `npm run build` or `yarn build`: Builds the Next.js app for production.
*   `npm run start` or `yarn start`: Starts the production Next.js server (after building).
*   `npm run lint` or `yarn lint`: Lints the project files using Next.js's built-in ESLint configuration.
*   `npm run typecheck` or `yarn typecheck`: Runs TypeScript type checking.

## 🤖 AI Features (Genkit)

This application leverages Genkit to integrate AI capabilities. Key AI flows implemented include:

*   **`generateContextualInsights`:** (Located in `src/ai/flows/generate-contextual-insights.ts`)
    Provides AI-generated explanations and statistics for keywords found in the main text content. This is used for the hover-card insights.
*   **`generateTestimonialImageFlow`:** (Located in `src/ai/flows/generate-testimonial-image-flow.ts`)
    Generates avatar images for testimonials using an AI image generation model (Gemini 2.0 Flash experimental). (Note: Currently disabled in the UI for testimonials but the flow exists.)

---

This README provides a good starting point. You can further customize it with more specific details about your project's architecture, contribution guidelines, or future plans.
