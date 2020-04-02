json.set! :questions do
  json.array! @questions do |q|
    json.id q.id
    json.user_id q.user_id
    json.user_name q.user.name
    json.title q.title
    json.correctAnswer q.correct_answer.to_i
    json.answers q.answers 
  end    
end  