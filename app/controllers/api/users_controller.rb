module API
  class UsersController < ApplicationController

    def index
      if logged_in?
        @users = User.paginate(page: params[:page])
        render json: { 
          users: @users,
          page: @users.current_page,
          pages: @users.total_pages
        }   
      end
    end

    def new
      @user = User.new
    end

    def create
      @user = User.new(user_params) 
      if @user.save
        log_in @user
        render json: { user: @user }, status: :ok
      end
    end

    private

    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end

  end
end
