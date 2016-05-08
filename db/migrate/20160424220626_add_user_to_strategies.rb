class AddUserToStrategies < ActiveRecord::Migration
  def change
    add_reference :strategies, :user, index: true, foreign_key: true
  end
end
