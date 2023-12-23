IMAGE_URL=me-west1-docker.pkg.dev/storyteller-408913/storyteller/proxy:$(uuidgen)
docker build --build-arg ENV=prod -t $IMAGE_URL .
docker push $IMAGE_URL
gcloud run deploy storyteller-proxy --image $IMAGE_URL
