questions = Question.create([
    {title: 'Solve : 24 + 4 ÷ 4', option1: '25', option2: '6', option3: '28', option4: '7', correct_answer: 1},
    {title: 'Solve : 24 + 4 ÷ 4 - (8 + 1)', option1: '11', option2: '22', option3: '18', option4: '24', correct_answer: 3},
    {title: 'Solve : sqrt(196)', option1: '13', option2: '14', option3: '16', option4: '17', correct_answer: 2},
    {title: 'Solve: 5!', option1: '15', option2: '25', option3: '100', option4: '120', correct_answer: 4},
])

User.create!(name:  "Jonatan",
             email: "mathquiz@quiz.com",
             password:              "123123",
             password_confirmation: "123123")

25.times do |n|
  name  = Faker::Name.name
  email = "math-#{n+1}@quizquiz.com"
  password = "password"
  User.create!(name:  name,
               email: email,
               password:              password,
               password_confirmation: password)
end