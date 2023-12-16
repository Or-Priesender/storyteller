pushd ./frontend/storyteller
npx protoc -I ../../backend/api/ --ts_out=src/client ../../backend/api/api.proto
popd

pushd ./backend/
protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative api/api.proto
popd
