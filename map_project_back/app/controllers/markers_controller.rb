class MarkersController < ApplicationController

  def index
    user_id = Auth.decode(params["jwt"])["user_id"]
    if user_id
      user = User.find(user_id)
      user_marker = last_user_marker(user_id)
      markers = nearby_markers(user_marker, user_id)

      message = game_logic(user, user_marker, markers)

      if markers
        results = markers.each_with_object([]) do |marker, array|
          array << {
            position: {
              lat: marker.lat,
              lng: marker.lng
            },
            zombie: marker.zombie,
            username: marker.user.username
          }
        end

        render json: {
          message: message,
          markers: {
            user: {
              position: {
                lat: user_marker.lat,
                lng: user_marker.lng
              },
              zombie: user_marker.zombie
            },
            nearby: results,
            date: user_marker.created_at.strftime("%B%e, %Y - %A")
          }
        }
      else
        render json: {
          error: "no markers"
        }
      end
    else
      render json: {
        error: "some sort of jwt error"
      }
    end
  end

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

    render json: {}
  end

  def update_marker(marker, params)
    marker.update(lat: params["data"]["lat"], lng: params["data"]["lng"])
    render json: {}
  end

  def last_user_marker(user_id)
    Marker.where("user_id = ? AND created_at < ?", user_id, Time.zone.now.beginning_of_day).order("created_at ASC").last
  end

  def nearby_markers(user_marker, user_id)
    lat_min = user_marker.lat - 0.004
    lat_max = user_marker.lat + 0.004
    lng_min = user_marker.lng - 0.004
    lng_max = user_marker.lng + 0.004

    Marker.where("created_at >= ? AND created_at <= ? AND (lat BETWEEN ? AND ?) AND (lng BETWEEN ? AND ?) AND user_id != ?",
     user_marker.created_at.beginning_of_day, user_marker.created_at.end_of_day, lat_min, lat_max, lng_min, lng_max, user_id)
  end

  def game_logic(user, user_marker, markers)
    message = user_marker.zombie ? "zombie-" : "human-"

    distance_list = markers.map { |marker|
      a = user_marker.lng - marker.lng
      b = user_marker.lat - marker.lat
      distance = (a.power(2) + b.power(2)).sqrt(1).to_f
      { zombie: marker.zombie, distance: distance }
    }

    sorted = distance_list.sort {|x,y| x[:distance] <=> y[:distance]}
    closest_marker_zombie_attr = sorted.first[:zombie]

    if closest_marker_zombie_attr
      user.zombie = true
      message += "loss"
    else
      if user.updated_at < Time.zone.today
        user.score += 1
      end
      message += "win"
    end

    user.save

    message
  end

end
