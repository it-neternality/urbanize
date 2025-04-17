docker run --rm -it -p 3000:3000 -v "$(pwd)":/app -w /app node:20-alpine sh -c "npm install && npm run dev"

