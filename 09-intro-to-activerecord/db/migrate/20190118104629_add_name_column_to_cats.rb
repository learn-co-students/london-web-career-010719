class AddNameColumnToCats < ActiveRecord::Migration[5.2]
  def change
    add_column :cats, :name, :string
  end
end
