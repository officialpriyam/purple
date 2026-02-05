# Purple: AI-Powered Full-Stack Web Development

Purple is an advanced AI coding agent that runs in your browser, powered by StackBlitz's WebContainers. It allows you to prompt, run, edit, and deploy full-stack applications directly from your browser.

## Prerequisites

-   **Node.js**: Version 18.18.0 or higher.
-   **Package Manager**: `pnpm` (recommended) or `npm`.

## Installation

1.  **Clone the repository** (if you haven't already).
2.  **Install dependencies**:
    ```bash
    pnpm install
    # or
    npm install
    ```

## Configuration

1.  **Environment Variables**:
    Create a `.env` file in the root directory. You can copy the example if it exists, or just create it from scratch.

2.  **Add API Keys**:
    Edit the `.env` file and add your OpenRouter API key to enable the AI generation features:
    ```env
    OPEN_ROUTER_API_KEY=your_key_here
    ```
    *(Note: This key allows you to use free models like Mistral 7B via OpenRouter)*

## Development

Start the development server:

```bash
pnpm run dev
# or
npm run dev
```

The app will be available at `http://localhost:5173`.

## Features

-   **Deep Dark Theme**: A premium "Lovable" interface with a rich purple-gradient background.
-   **Full-Stack Capability**: Runs Node.js servers, install packages, and edit code directly in the browser.
-   **AI Integration**: Fully configured for OpenRouter support.

---

