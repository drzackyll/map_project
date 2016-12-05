class MarkersController < ApplicationController

  def create
    byebug
    marker = Marker.new(marker_params)
    if marker.save
      render json: {
        marker: {
          user_id: marker.user_id,
          lat: marker.lat,
          lng: marker.lng,
        }
      }
    else
      render json: {
        error: "there shouldn't be any errors"
      }
    end
  end

  private
  def marker_params
    params.require(:data).permit(:user_id, :lat, :lng)
  end
end
