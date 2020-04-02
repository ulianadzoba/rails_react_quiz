module API
  class QuestionsController < ApplicationController

    def index
      @questions = Question.all
      respond_to do |format|
        format.json
      end  
    end

    def new
      @question = Question.new
    end
    
    def create
      question = current_user.questions.build(title: params[:question], correct_answer: params[:correctAnswerId].to_s)
      params[:answers].each { |answer| question.public_send("option#{answer[:id]}=", answer[:text]) }
      question.save!
      head :ok
    end

    private

    def question_params
      params.require(:question).permit(:title, :correct_answer, :answers)
    end

  end
end