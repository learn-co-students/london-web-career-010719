class CreateCars < ActiveRecord::Migration[5.2]
  def change
    create_table :cars do |t|
      t.references :brand, foreign_key: true
      t.references :owner, foreign_key: true
      t.references :mechanic, foreign_key: true

      t.timestamps
    end
  end
end
