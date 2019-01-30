class AddColumnDogIdToToysTable < ActiveRecord::Migration
  def change
    add_column :toys, :dog_id, :integer
  end
end
