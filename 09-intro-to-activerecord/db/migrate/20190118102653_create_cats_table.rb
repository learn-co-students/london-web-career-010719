class CreateCatsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :cats do |t|
      t.string :colour
      t.integer :age
      t.boolean :hungry
    end
  end
end
