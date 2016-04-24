class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.json :content

      t.timestamps null: false
    end
  end
end
