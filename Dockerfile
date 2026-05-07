# --- GIAI ĐOẠN 1: BUILD ---
FROM node:18-alpine AS builder

WORKDIR /app

# Cache dependencies
COPY package*.json ./
# Dùng npm ci thay cho npm install để đảm bảo đúng phiên bản trong lockfile
RUN npm install

# Copy toàn bộ source và build (nếu có dùng TypeScript hoặc Babel)
COPY . .
# RUN npm run build # Bỏ comment nếu bạn có bước build

# --- GIAI ĐOẠN 2: PRODUCTION ---
FROM node:18-alpine AS runner

WORKDIR /app

# Thiết lập biến môi trường
ENV NODE_ENV=production

# Chỉ copy những file cần thiết từ giai đoạn build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Bảo mật: Không chạy ứng dụng bằng quyền root
USER node

EXPOSE 5000

# Sử dụng dumb-init hoặc node trực tiếp để xử lý tín hiệu tắt (SIGTERM)
CMD ["node", "index.js"]
