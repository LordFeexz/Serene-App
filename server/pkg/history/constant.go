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
	MENTAL_HEALTH_TEST feature = "Membuka fitur mental health test"
	ADD_MOOD           feature = "Membuka fitur mood test"
	GET_VIDEO_THERAPY  feature = "Membuka fitur video relaksasi"
	GET_NEARBY_CLINIC  feature = "Membuka fitur rujukan"
)
