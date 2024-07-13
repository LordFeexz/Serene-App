package user

import (
	"context"
	"database/sql"
	"fmt"
	"serene-app/database"
	h "serene-app/helpers"
)

func NewRepo() UserRepo {
	return &UserRepoImpl{database.DB}
}

func (r *UserRepoImpl) GetDb() *sql.DB {
	return r.DB
}

func (r *UserRepoImpl) Create(ctx context.Context, data *User) error {
	return r.DB.QueryRowContext(
		ctx,
		h.LogQuery(
			fmt.Sprintf(`INSERT INTO "%s" 
			(username, email, password, is_verified, created_at, updated_at)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING id
			`, TABLE_NAME)),
		data.Username, data.Email, data.Password, data.IsVerified, data.CreatedAt, data.UpdatedAt,
	).Scan(&data.Id)
}

func (r *UserRepoImpl) UpdateVerify(ctx context.Context, id string) (err error) {
	_, err = r.DB.ExecContext(ctx, h.LogQuery(fmt.Sprintf(`UPDATE "%s" SET is_verified = true WHERE id = $1`, TABLE_NAME)), id)
	return
}
