class AddUserIdToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :user_id, :integer, after: :id
  end
end
