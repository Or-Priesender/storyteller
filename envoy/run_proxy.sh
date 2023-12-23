docker build --build-arg ENV=local -t grpc-envoy .
docker run -p 9901:9901 -p 8080:8080 -it grpc-envoy
