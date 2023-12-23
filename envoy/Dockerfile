FROM envoyproxy/envoy:dev-053a565a36a2a2dd23879b8b9b79eb7e96590437
ARG ENV=local
COPY ${ENV}.yaml /etc/envoy/envoy.yaml

EXPOSE 9901
EXPOSE 8080
RUN apt-get install ca-certificates 
RUN chmod go+r /etc/envoy/envoy.yaml
