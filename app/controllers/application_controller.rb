class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  before_filter :send_user_id

  private 

  def send_user_id
  	gon.user_id = current_user.id if current_user
  end

end
