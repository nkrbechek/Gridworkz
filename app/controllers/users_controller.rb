class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end
  def game 
    @user = User.find(session[:user_id])
    def add_info
    add_info_with_para(params)
  end
  end
  
 
  def new
  	@user = User.new
    def create
    @user = User.new(user_params)    # Not the final implementation!
     
    respond_to do |format|
     format.json :json => user
    end
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
  
    def add_info_with_para p = {}
      user = User.find(session[:user_id])
      user.speedup = p[:speed]
      user.corrRow = p[:correctRow]
      user.gridSize = p[:grid]
      user.levelNum = p[:level]
      user.levelType = p[:type]
      user.attempts = p[:total]
      user.levelData = p[:levelInfo]
      user.totalCorrect = p[:correct] 
    end

end
