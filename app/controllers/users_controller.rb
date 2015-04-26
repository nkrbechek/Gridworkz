class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end
  def new
  	@user = User.new
  	def create
    @user = User.new(user_params)    # Not the final implementation!
    if @user.save
      log_in @user
      flash[:success] = "Welcome to Gridworkz!"
      redirect_to @user# Handle a successful save.
    else
      render 'new'
    end
  end
end
  private

    def user_params
      params.require(:user).permit(:name, :age, :gender, :password,
                                   :password_confirmation)
    end
  
end
