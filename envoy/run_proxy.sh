docker run --rm -it \
      -v $(pwd)/proxy.yaml:/envoy-custom.yaml \
      -p 9901:9901 \
      -p 8080:8080 \
      envoyproxy/envoy:dev-053a565a36a2a2dd23879b8b9b79eb7e96590437 \
          -c /envoy-custom.yaml --log-level debug
