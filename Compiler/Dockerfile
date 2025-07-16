FROM node:22-alpine 
WORKDIR /app
RUN apk update && apk add --no-cache g++
COPY . .
RUN npm install
ENV GOOGLE_GEMINI_API=AIzaSyAn9xx9Phf88RALtY3DFJnh1qMsCtxL_sw
EXPOSE 5000
CMD ["node","index.js"]



