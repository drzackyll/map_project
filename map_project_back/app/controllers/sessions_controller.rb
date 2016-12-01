class SessionsController < ApplicationController

  def create
    user = User.find_by(username: params[:auth][:username])
    if user.authenticate(params[:auth][:password])
      jwt = Auth.issue({user_id: user.id})
      render json: {
        jwt: jwt,
        user: {
          username: user.username,
          latitude: user.latitude,
          longitude: user.longitude
        }
      }
    end
  end
end
