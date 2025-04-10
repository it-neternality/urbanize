docker run --rm -it -p 3000:3000 -v "$FULL_PATH":/app -w /app node:20-alpine sh -c "npm install && npm run dev"

