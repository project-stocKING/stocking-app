class CreateStrategies < ActiveRecord::Migration
  def change
    create_table :strategies do |t|
      t.json :content
      t.string :signal

      t.timestamps null: false
    end
  end
end
