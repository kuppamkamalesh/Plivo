# n8n + LLM Text Analyzer

This project is a **React.js web application** integrated with an **n8n
workflow** for automated text analysis using a Large Language Model
(LLM). Users can input a paragraph and choose between **Summary** and
**Sentiment** modes to analyze the text.

------------------------------------------------------------------------

## 🚀 Features

-   Two analysis modes: **Summary** and **Sentiment**
-   Real-time result rendering
-   Robust error handling and loading indicators
-   Environment variable-based URL configuration
-   Clean, minimal design without external styling frameworks

------------------------------------------------------------------------

## 🧠 Workflow Description

1.  The user enters text and selects the analysis mode.
2.  The React app sends a POST request with the text and mode to the n8n
    webhook.
3.  The n8n workflow processes the text using a conditional logic node
    to determine the mode.
4.  The LLM (Gemini) receives the prompt and returns
    the analysis result.
5.  The result is sent back through the **Respond to Webhook** node.
6.  The React frontend displays the analysis result neatly on the
    screen.

------------------------------------------------------------------------

## 🛠️ Tools and Technologies

-   **React.js** --- Frontend development framework.
-   **Axios** --- For HTTP POST requests to the backend.
-   **n8n** --- Automation tool connecting APIs and workflows.
-   **LLM API** --- For text summarization and sentiment analysis.
-   **Environment Variables** --- Used to store the webhook securely.

------------------------------------------------------------------------

## ⚙️ Setup Instructions

### 1. Clone the repository

``` bash
git clone https://github.com/your-username/n8n-text-analyzer.git
cd n8n-text-analyzer
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Create a `.env` file

Add your production n8n webhook URL:

``` env
REACT_APP_n8nLink=https://kamaleshk.app.n8n.cloud/webhook/text-analysis
```

### 4. Run the app

``` bash
npm start
```

Access it locally at `http://localhost:3000`.

------------------------------------------------------------------------

## 🌍 Deployment Notes

-   Add the same `REACT_APP_n8nLink` variable in your hosting provider's
    **Environment Variables** section.
-   Supported platforms: **Netlify**.
-   Ensure the n8n webhook is public and active.

------------------------------------------------------------------------

## 📈 Example n8n Workflow

-   **Trigger:** Webhook (POST)
-   **Nodes:**
    -   Function node (for conditional logic)
    -   LLM (e.g., OpenAI node for summary/sentiment generation)
    -   Respond to Webhook (returns `{ analysis: "..." }`)

------------------------------------------------------------------------

## 🧩 Architecture Summary

-   **Frontend (React):**
    -   Handles text input, mode selection, and result display.
    -   Communicates with the backend using Axios.
-   **Backend (n8n Workflow):**
    -   Processes input text.
    -   Integrates LLM for text processing.
    -   Sends formatted response back.

------------------------------------------------------------------------

## 📘 Developer Documentation

### Overview

The **n8n + LLM Text Analyzer** demonstrates seamless integration
between frontend and workflow automation. It provides a lightweight,
efficient way to automate AI-based text interpretation directly from a
web interface.

### Setup Workflow in n8n

1.  Create a **Webhook Trigger** node (POST method).
2.  Add a **Switch** or **IF** node to branch logic by `mode` value.
3.  Connect each branch to an **LLM Node** (e.g., OpenAI, Gemini, or
    Claude) with mode-specific prompts.
4.  Merge the outputs and send the final text via **Respond to
    Webhook**.

### Key Environment Variable

  Variable            Description
  ------------------- -----------------------------------------------
  REACT_APP_n8nLink   The webhook URL endpoint of your n8n workflow

### Troubleshooting

  ----------------------------------------------------------------------------------
  Issue                         Cause                 Solution
  ----------------------------- --------------------- ------------------------------
  `Cannot POST /undefined`      `.env` not loaded     Restart the server or check
                                                      the variable name

  `No response from workflow`   n8n webhook inactive  Activate workflow and verify
                                or incorrect URL      endpoint

  Timeout                       n8n server slow or    Increase timeout in Axios or
                                blocked               optimize workflow
  ----------------------------------------------------------------------------------

------------------------------------------------------------------------

## 🧑‍💻 Author

**Kuppam Kamalesh**\
Frontend Developer \| React.js \| n8n

------------------------------------------------------------------------

## 📝 License

MIT License © 2024
