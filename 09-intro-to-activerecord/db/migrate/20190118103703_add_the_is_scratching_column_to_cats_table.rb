class AddTheIsScratchingColumnToCatsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :cats, :is_scratching, :boolean
  end
end
