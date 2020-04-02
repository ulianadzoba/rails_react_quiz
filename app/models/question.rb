class Question < ApplicationRecord
    validates :title, :option1, :option2, :option3, :option4, :correct_answer, presence: true

    belongs_to :user

    def answers
      (1..4).map do |i|
        { id: i, text: public_send("option#{i}") }
      end  
    end    
end
