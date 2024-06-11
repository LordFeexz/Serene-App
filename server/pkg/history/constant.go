package history

import (
	"context"
	"database/sql"
)

type HistoryRepo interface {
	GetDb() *sql.DB
	Create(ctx context.Context, data *History) error
	CreateWithTx(tx *sql.Tx, data *History) error
}

type HistoryRepoImpl struct{ *sql.DB }

type feature string

const (
	TABLE_NAME                 = "history"
	MENTAL_HEALTH_TEST feature = "Tes Mental Health"
	ADD_MOOD           feature = "Menambahkan mood hari ini"
	GET_VIDEO_THERAPY  feature = "Membuka fitur video relaksasi"
)
