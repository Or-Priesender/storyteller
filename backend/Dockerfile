FROM golang:1.21.4-alpine
WORKDIR /app

COPY go.mod go.sum /app/
RUN go mod download

COPY . /app/

ARG PORT=9090
ARG OPEN_AI_API_TOKEN

ENV PORT=${PORT}
ENV OPEN_AI_API_TOKEN=${OPEN_AI_API_TOKEN}

RUN CGO_ENABLED=0 GOOS=linux go build -o /storyteller

EXPOSE $PORT
CMD ["/storyteller"]
