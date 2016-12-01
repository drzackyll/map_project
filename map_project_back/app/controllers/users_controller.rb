class UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      login
      render json: #something else here
    else
    end
  end


  private
  def user_params
    params.require #somthi else here
  end
end
