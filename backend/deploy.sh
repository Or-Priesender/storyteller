IMAGE_URL=me-west1-docker.pkg.dev/storyteller-408913/storyteller/server:$(uuidgen)
docker build --build-arg PORT=9090 --build-arg OPEN_AI_API_TOKEN=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 -t $IMAGE_URL .
docker push $IMAGE_URL
gcloud run deploy storyteller-server --image $IMAGE_URL
