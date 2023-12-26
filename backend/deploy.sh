IMAGE_URL=me-west1-docker.pkg.dev/storyteller-408913/storyteller/server:$(uuidgen)
docker build --build-arg PORT=9090 --build-arg OPEN_AI_API_TOKEN=${OPEN_AI_API_TOKEN} -t $IMAGE_URL .
docker push $IMAGE_URL
gcloud run deploy storyteller-server --image $IMAGE_URL
