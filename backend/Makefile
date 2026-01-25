.PHONY: run build test clean dev

# Run with air (hot reload)
dev:
	air

# Run normally
run:
	go run cmd/server/main.go

# Build binary
build:
	go build -o bin/server cmd/server/main.go

# Run tests
test:
	go test -v ./...

# Clean build artifacts
clean:
	rm -rf bin/ tmp/

# Install dependencies
deps:
	go mod download
	go mod tidy

# Format code
fmt:
	go fmt ./...

# Run linter (optional)
lint:
	golangci-lint run
EOF