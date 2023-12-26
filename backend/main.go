package main

import (
	"context"
	"fmt"
	"net"
	"os"
	"storyteller/ai"
	pb "storyteller/api"
	"strings"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func cli() {
	fmt.Println("Write some topics, when you are happy write 0")

	input := ""
	topics := []string{}

	for input != "0" {
		fmt.Scanln(&input)
		topics = append(topics, input)
	}

	topics = topics[:len(topics)-1]
	fmt.Println("Telling a story about: " + strings.Join(topics, ","))
	story, err := ai.GenerateStory(topics, 200)
	if err != nil {
		fmt.Println("Error generating story", err)
		return
	}
	fmt.Println("Story: ", story)
}

type storyGeneratorServer struct {
	pb.UnimplementedStoryGeneratorServer
}

func (s *storyGeneratorServer) GenerateStory(ctx context.Context, topics *pb.GenerateStoryRequest) (*pb.GenerateStoryResponse, error) {
	fmt.Printf("Received request to generate a story with %d words about %s\n", *topics.Length, strings.Join(topics.Topics, ","))
	response, err := ai.GenerateStory(topics.Topics, *topics.Length)
	if err != nil {
		return nil, status.Error(codes.NotFound, "Could not generate story from given topics")
	}

	pages := strings.Split(response.Story, "\n\n")
	fmt.Printf("Generated story with %d pages\n", len(pages))
	return &pb.GenerateStoryResponse{Pages: pages, Images: response.Images}, nil
}

func main() {
	port, is_port_externally_set := os.LookupEnv("PORT")
	if !is_port_externally_set {
		port = "9090"
	}

	listener, err := net.Listen("tcp", "0.0.0.0:"+port)
	if err != nil {
		fmt.Println("Error starting tcp server", err)
		return
	}

	grpcServer := grpc.NewServer()
	pb.RegisterStoryGeneratorServer(grpcServer, &storyGeneratorServer{})
	fmt.Println("Starting to serve on port " + port)
	grpcServer.Serve(listener)
}
