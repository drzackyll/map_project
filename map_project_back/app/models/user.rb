class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  validates :username, uniqueness: true

  def set_location(latitude, longitude)
    this.latitude = latitude
    this.longitude = longitude
  end
end
