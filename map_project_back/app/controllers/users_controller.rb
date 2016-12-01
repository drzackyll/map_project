class UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
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

  private
  def user_params
    params.require(:auth).permit(:username, :password)
  end
end
