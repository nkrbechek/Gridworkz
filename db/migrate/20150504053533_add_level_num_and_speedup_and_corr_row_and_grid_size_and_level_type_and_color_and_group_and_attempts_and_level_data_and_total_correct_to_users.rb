class AddLevelNumAndSpeedupAndCorrRowAndGridSizeAndLevelTypeAndColorAndGroupAndAttemptsAndLevelDataAndTotalCorrectToUsers < ActiveRecord::Migration
  def change
    add_column :users, :levelNum, :integer
    add_column :users, :speedup, :integer
    add_column :users, :corrRow, :integer
    add_column :users, :gridSize, :integer
    add_column :users, :levelType, :integer
    add_column :users, :color, :string
    add_column :users, :group, :integer
    add_column :users, :attempts, :integer
    add_column :users, :levelData, :string
    add_column :users, :totalCorrect, :integer
  end
end
