class UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      jwt = Auth.issue({user_id: user.id})
      render json: {
        jwt: jwt,
        user: {
          username: user.username,
          lat: user.lat,
          lng: user.lng
        }
      }
    else
      render json: {
        error: user.errors.full_messages.first
      }
    end
  end

  def index
    jwt = request.env["HTTP_AUTHORIZATION"]
    auth_hash = Auth.decode(jwt)
    if auth_hash
      user = User.find(auth_hash["user_id"])
      render json: {
        jwt: jwt,
        user: {
          username: user.username,
          lat: user.lat,
          lng: user.lng
        }
      }
    else
      render json: {
        error: "wrong jwt sucka"
      }
    end
  end

  def update
    jwt = request.env["HTTP_AUTHORIZATION"]
    auth_hash = Auth.decode(jwt)
    if auth_hash
      User.update(auth_hash["user_id"], location_params)
      user = User.find(auth_hash["user_id"])
      render json: {
        jwt: jwt,
        user: {
          username: user.username,
          lat: user.lat,
          lng: user.lng
        }
      }
    else
      render json: {
        error: "i dunno, some thing lol"
      }
    end
  end

  private
  def user_params
    params.require(:auth).permit(:username, :password)
  end

  def location_params
    params.require(:location).permit(:lat, :lng)
  end
end
