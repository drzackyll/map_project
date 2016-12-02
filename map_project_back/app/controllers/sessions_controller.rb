class SessionsController < ApplicationController

  def create
    user = User.find_by(username: params[:auth][:username])
    if user && user.authenticate(params[:auth][:password])
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
        error: "User authentication failed."
      }
    end
  end
end
