class CreatePersonsAndWalksAndToysTables < ActiveRecord::Migration
  def change

    create_table :people do |t|
      t.string :name
    end

    create_table :toys do |t|
      t.string :name
    end

    create_table :walks do |t|
      t.integer :dog_id
      t.integer :person_id
      t.integer :minutes
    end
  end
end
