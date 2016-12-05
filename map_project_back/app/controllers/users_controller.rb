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

  private
  def user_params
    params.require(:auth).permit(:username, :password)
  end
end
