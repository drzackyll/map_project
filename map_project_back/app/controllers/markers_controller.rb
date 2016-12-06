class MarkersController < ApplicationController

  def create
    user_id = Auth.decode(params["jwt"])["user_id"]
    if user_id
      marker = Marker.find_by("user_id = ? AND created_at >= ?", user_id, Time.zone.now.beginning_of_day)
      if marker
        update_marker(marker, params)
      else
        create_marker(user_id, params)
      end
    else
      render json: {
        error: "some sort of jwt error"
      }
    end
  end

  private

  def create_marker(user_id, params)
    marker = Marker.new(user_id: user_id, lat: params["data"]["lat"], lng: params["data"]["lng"])
    marker.zombie = marker.user.zombie
    marker.save

    render json: {
      marker: {
        user_id: marker.user_id,
        lat: marker.lat,
        lng: marker.lng,
        zombie: marker.zombie
      }
    }
  end

  def update_marker(marker, params)
    marker.update(lat: params["data"]["lat"], lng: params["data"]["lng"])
    render json: {
      marker: {
        user_id: marker.user_id,
        lat: marker.lat,
        lng: marker.lng,
        zombie: marker.zombie
      }
    }
  end

end
