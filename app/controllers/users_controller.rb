class UsersController < ApplicationController
  respond_to :html, :js, :json

  def show
    @user = User.find(session[:user_id])
  end
  def index
  end
   def game 
    @user = User.find(session[:user_id])

  end
  def new
    @user = User.new
  end
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
def add
   user = User.find(params[:id])
   user.speedup = params[:speedup]
   user.corrRow = params[:correctRow]
   user.gridSize = params[:gridSize]
   user.levelNum = params[:levelNum]
   user.levelType = params[:levelType]
   user.attempts = params[:attempts]
   user.levelData = params[:levelInfo]
   user.totalCorrect = params[:totalCorr]
   user.save
   render :nothing => true
   head :ok
       
  end
  private

    def user_params
      params.require(:user).permit(:name, :age, :gender, :password,
                                   :password_confirmation)
    end
    def add_info_with_para p = {}
      @user = User.find(session[:user_id])
      @user.corrRow = params[:correctRow]
      @user.gridSize = params[:gridSize]
      @user.levelNum = params[:levelNum]
      @user.levelType = params[:levelType]
      @user.attempts = params[:attempts]
      @user.levelData = params[:levelInfo]
      @user.totalCorrect = params[:totalCorr]
    end
end