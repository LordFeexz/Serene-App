package libs

import (
	"context"

	"googlemaps.github.io/maps"
)

type Gmaps interface {
	NearbyClinic(ctx context.Context, lat, lng float64, radius uint, pageToken string) ([]LocationSearchResult, string, error)
}

type GmapsImpl struct{ *maps.Client }

type LocationSearchResult struct {
	Id       string               `json:"id"`
	PlaceId  string               `json:"place_id"`
	Name     string               `json:"name"`
	Icon     string               `json:"icon"`
	Rating   float32              `json:"rating"`
	Vicinity string               `json:"vicinity"`
	Geometry maps.AddressGeometry `json:"geometry"`
}
