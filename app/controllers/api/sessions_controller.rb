module API
  class SessionsController < ApplicationController

    def new
    end

    def create
      user = User.find_by(email: params[:session][:email].downcase)
      if user && user.authenticate(params[:session][:password])
        log_in user
        render json: {
          logged_in: true,
          user: user
        }
      end
    end

    def is_logged_in?
      if logged_in? && current_user
        render json: {
          logged_in: true,
          user: current_user
        }
      else
        render json: {
          logged_in: false,
          message: 'no such user'
        }
      end
    end
    
    def destroy
      log_out
      render json: {
        status: 200,
        logged_out: true
      }
    end

    private

    def session_params
      params.require(:user).permit(:email, :password)
    end
      
  end
end