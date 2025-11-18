#!/bin/bash
set -e

echo "=============================="
echo "🧪 RUNNING ALL EPHECT TESTS"
echo "=============================="

# Retourner à la racine du projet
cd "$(dirname "$0")/.."

# ----------------------------
# 1️⃣ Formatter tests (Node.js / Jest)
# ----------------------------
echo "💻 Running formatter tests..."
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found, please install Node.js"
    exit 1
fi

npm install jest ts-jest @types/jest --save-dev 2>/dev/null || true
npx jest tests/formatter.test.ts --colors
echo "✅ Formatter tests passed!"

# ----------------------------
# 2️⃣ LSP tests (Node.js / Jest)
# ----------------------------
echo "💻 Running LSP tests..."
npx jest tests/lsp-test.ts --colors
echo "✅ LSP tests passed!"

# ----------------------------
# 3️⃣ Parser tests (PHP)
# ----------------------------
echo "🐘 Running PHP parser tests..."
if ! command -v php &> /dev/null; then
    echo "❌ PHP not found, please install PHP CLI"
    exit 1
fi

php tests/parser.test.php
echo "✅ Parser tests passed!"

# ----------------------------
# 4️⃣ VS Code syntax & snippets (manual check)
# ----------------------------
echo "🖥️ VS Code syntax/snippets test"
echo "⚠️ Automated checking limited, please open VS Code and load 'sample.php' from tests/fixtures/"
echo "⚠️ Ensure grammar injection and snippets are correctly highlighted"

# ----------------------------
# 5️⃣ Finished
# ----------------------------
echo "=============================="
echo "🎉 ALL AUTOMATED TESTS DONE!"
echo "=============================="
