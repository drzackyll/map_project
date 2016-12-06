# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

names = [
  'Bobby',
  'Hank',
  'Peggy',
  'Luanne',
  'Ladybird',
  'Dale',
  'Nancy',
  'Joseph',
  'Bill',
  'Boomhauer'
]

n_lat = 40.707
s_lat = 40.703
e_lng = -74.011
w_lng = -74.017

names.each { |name|
  user = User.create(username: name, password: name)
  lat = rand(s_lat..n_lat)
  lng = rand(w_lng..e_lng)
  marker = Marker.create(user_id: user.id, lat: lat, lng: lng)
  marker.created_at = 1.days.ago
  marker.save
}
