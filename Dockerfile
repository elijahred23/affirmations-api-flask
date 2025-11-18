FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

FROM python:3.12-slim AS backend
WORKDIR /app

# Copy backend files
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Copy built frontend to Flask's static directory
COPY --from=frontend-build /app/frontend/../static ./static

EXPOSE 5000
CMD ["python", "app.py"]
