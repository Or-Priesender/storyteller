# Storyteller AI

There are 3 components to this project:
1. Backend server - written in Go, handles gRPC calls to generate stories through Open AI API
2. Frontend site - written in Vue
3. Envoy proxy - allows gRPC web communication from frontend to backend

## Running locally
Before starting, you should register for a paid Open AI api key, and then export it:
```
export OPEN_AI_API_KEY=<key>
```
### Backend
```
cd backend
go mod download
go run main.go
```

### Frontend
```
cd frontend/storyteller
npm install
npm run dev
```

### Envoy proxy
```
cd envoy
./run_proxy.sh
```
