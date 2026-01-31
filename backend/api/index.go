package handler

import (
	"net/http"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/config"
	httpDelivery "github.com/rhesatsaqif23/diro-reservation-app/backend/core/delivery/http"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/core/infrastructure/database"
)

var (
	app  *gin.Engine
	once sync.Once
)

// Fungsi ini memastikan inisialisasi hanya berjalan sekali (Singleton pattern)
func initApp() {
	cfg := config.LoadConfig()

	// Override Env untuk Vercel
	cfg.Server.Env = "production"

	// Inisialisasi DB
	db, err := database.InitDB(cfg)
	if err != nil {
		panic("Failed to connect to database: " + err.Error())
	}

	// Load Router
	app = httpDelivery.NewRouter(db, cfg)
}

// Handler adalah entry point yang dicari oleh Vercel
func Handler(w http.ResponseWriter, r *http.Request) {
	// Inisialisasi aplikasi jika belum siap
	once.Do(initApp)

	// Membuang prefix "/api" agar sesuai dengan route yang didefinisikan di Gin.
	r.URL.Path = strings.TrimPrefix(r.URL.Path, "/api")

	// Serahkan request ke Gin
	app.ServeHTTP(w, r)
}
