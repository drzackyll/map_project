class UsersController < ApplicationController

  def create
    user = User.new(user_params)

    if rand(1..6) == 6
      user.zombie = true
    else
      user.zombie = false
    end

    if user.save
      jwt = Auth.issue({user_id: user.id})
      render json: {
        jwt: jwt
      }
    else
      render json: {
        error: user.errors.full_messages.first
      }
    end
  end

  private
  def user_params
    params.require(:auth).permit(:username, :password)
  end
end
