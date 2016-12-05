class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  validates :username, uniqueness: true

  def set_location(lat, lng)
    this.lat = lat
    this.lng = lng
  end
end
