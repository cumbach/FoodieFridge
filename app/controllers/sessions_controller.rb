class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password])
    if @user
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Incorrect Username/Password"]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end

end
