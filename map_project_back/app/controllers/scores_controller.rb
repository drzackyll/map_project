class ScoresController < ApplicationController
  def index
    user_id = Auth.decode(params["jwt"])["user_id"]
    if user_id
      user = User.find(user_id)

      human_scores = User.order(days_survived: :desc).limit(10)
      human_scores_json = human_scores.each_with_object([]) do |user, array|
        array << {
          username: user.username,
          days_survived: user.days_survived
        }
      end

      zombie_scores = User.order(humans_infected: :desc).limit(10)
      zombie_scores_json = human_scores.each_with_object([]) do |user, array|
        array << {
          username: user.username,
          humans_infected: user.humans_infected
        }
      end

      render json: {
        user: {
          username: user.username,
          days_survived: user.days_survived,
          humans_infected: user.humans_infected
        },
        scores: {
          human: human_scores_json,
          zombie: zombie_scores_json
        }
      }
    else
      render json: {
        error: "some sort of jwt error"
      }
    end
  end
end
