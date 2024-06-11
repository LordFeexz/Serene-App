package libs

import (
	"context"
	"os"
	"serene-app/exceptions"

	"googlemaps.github.io/maps"
)

func StartGmap() (data Gmaps, err error) {
	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("GOOGLE_API_KEY")))
	if err != nil {
		return
	}

	data = &GmapsImpl{client}
	return
}

func (g *GmapsImpl) NearbyClinic(ctx context.Context, lat, lng float64, radius uint, pageToken string) (datas []LocationSearchResult, nextPage string, err error) {
	resp, err := g.NearbySearch(ctx, &maps.NearbySearchRequest{
		Location: &maps.LatLng{
			Lat: lat,
			Lng: lng,
		},
		Radius:    radius,
		Keyword:   "klinik terdekat",
		Type:      maps.PlaceTypePharmacy,
		PageToken: pageToken,
	})
	if err != nil {
		return
	}

	for _, result := range resp.Results {
		datas = append(datas, LocationSearchResult{
			Id:       result.ID,
			PlaceId:  result.PlaceID,
			Name:     result.Name,
			Icon:     result.Icon,
			Rating:   result.Rating,
			Vicinity: result.Vicinity,
			Geometry: result.Geometry,
		})
	}

	if len(datas) < 1 {
		err = exceptions.NewError("tidak ada data klinik terdekat", 404)
		return
	}

	nextPage = resp.NextPageToken

	return
}
