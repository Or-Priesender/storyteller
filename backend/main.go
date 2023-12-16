package main

import (
	"context"
	"fmt"
	"net"
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

func (s *storyGeneratorServer) GenerateStory(ctx context.Context, topics *pb.Topics) (*pb.Story, error) {
	fmt.Printf("Received request to generate a story with %d words\n", *topics.Length)
	story, err := ai.GenerateStory(topics.Topics, *topics.Length)
	if err != nil {
		return nil, status.Error(codes.NotFound, "Could not generate story from given topics")
	}

	pages := int32(len(strings.Split(story, " ")) / 25)
	fmt.Printf("Generated story with %d pages\n", pages)
	return &pb.Story{Story: story, Pages: pages}, nil
}

func main() {
	listener, err := net.Listen("tcp", "0.0.0.0:9090")
	if err != nil {
		fmt.Println("Error starting tcp server", err)
		return
	}

	grpcServer := grpc.NewServer()
	pb.RegisterStoryGeneratorServer(grpcServer, &storyGeneratorServer{})
	fmt.Println("Starting to serve")
	grpcServer.Serve(listener)
}
