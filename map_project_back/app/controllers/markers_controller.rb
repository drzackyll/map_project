class MarkersController < ApplicationController

  def create
    user_id = Auth.decode(params["jwt"])["user_id"]
    if user_id
      marker = Marker.new(user_id: user_id, lat: params["data"]["lat"], lng: params["data"]["lng"])
      marker.zombie = marker.user.zombie
      marker.save

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

end
