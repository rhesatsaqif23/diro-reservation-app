package config

import (
	"log"
	"os"
	"strconv"
	"strings"
)

type Config struct {
	Server   ServerConfig
	Database DatabaseConfig
	JWT      JWTConfig
	Midtrans MidtransConfig
}

type ServerConfig struct {
	Port           string
	Env            string
	AllowedOrigins []string
}

type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
}

type JWTConfig struct {
	Secret      string
	ExpireHours int
}

type MidtransConfig struct {
	ServerKey    string
	ClientKey    string
	IsProduction bool
}

func LoadConfig() *Config {
	cfg := &Config{
		Server: ServerConfig{
			Port: getEnv("PORT", "8080"),
			Env:  getEnv("ENV", "development"),
			AllowedOrigins: strings.Split(
				getEnv("ALLOWED_ORIGINS", "http://localhost:3000"),
				",",
			),
		},
		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "5432"),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", ""),
			DBName:   getEnv("DB_NAME", "postgres"),
			SSLMode:  getEnv("DB_SSLMODE", "disable"),
		},
		JWT: JWTConfig{
			Secret:      getEnv("JWT_SECRET", "your-secret-key"),
			ExpireHours: getEnvAsInt("JWT_EXPIRE_HOURS", 72),
		},
		Midtrans: MidtransConfig{
			ServerKey:    getEnv("MIDTRANS_SERVER_KEY", ""),
			ClientKey:    getEnv("MIDTRANS_CLIENT_KEY", ""),
			IsProduction: getEnvAsBool("MIDTRANS_IS_PRODUCTION", false),
		},
	}

	// Validate critical configs
	validateConfig(cfg)

	return cfg
}

func validateConfig(cfg *Config) {
	if cfg.Database.Host == "" {
		log.Fatal("❌ DB_HOST is required")
	}
	if cfg.Database.Password == "" {
		log.Println("⚠️  Warning: DB_PASSWORD is empty")
	}
	if cfg.JWT.Secret == "your-secret-key" {
		log.Println("⚠️  Warning: Using default JWT_SECRET, please change in production!")
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}

func getEnvAsBool(key string, defaultValue bool) bool {
	if value := os.Getenv(key); value != "" {
		if boolValue, err := strconv.ParseBool(value); err == nil {
			return boolValue
		}
	}
	return defaultValue
}
