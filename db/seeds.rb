
puts "Seeding Users...."
# 50.times do
#     User.create(username: 'xXCharlie420Xx' , password: '123' , age: 19, name: "Charlie")
# end
    u1 = User.create(username: 'xXCharlie420Xx' , password: '123' , age: 19, name: "Charlie")
    u2 = User.create(username: 'jacob98' , password: '123' , age: 19, name: "Jacob")
    u3 = User.create(username: 'elijahzmith' , password: '123' , age: 22, name: "Elijah")
    u4 = User.create(username: 'bitz820' , password: '123' , age: 65, name: "Mark")
    u5 = User.create(username: 'elizabethtreahy' , password: '123' , age: 19, name: "Elizabeth")
    u6 = User.create(username: 'wowzers' , password: '123' , age: 23, name: "Potato")
puts "Done Seeding Users!"

puts "Seeding Listings...."
# 50.times do 
#     Listing.create(location: "Compton", image_url: Faker::LoremFlickr.image, what_it_is: Faker::Commerce.product_name, category: Faker::Commerce.department, description: Faker::Lorem)
# end

    l1 = Listing.create(location: "Compton", image_url: "https://images.craigslist.org/00C0C_gHxNjOcVrrOz_0t20CI_600x450.jpg", what_it_is: "Wooden Cabinet", category: "Furniture", description: "Vintage wooden cabinet. Well-built and sturdy. Doors open and close easily. The finish needs TLC. Missing one knob.", user_id: u1.id, winner_id: nil)
    l2 = Listing.create(location: "Compton", image_url: "https://images.craigslist.org/00B0B_cqaxgOGLl9Kz_09G07g_600x450.jpg", what_it_is: "Free Glass Corner Desk w/ Chair", category: "Furniture", description: "Free desk, as shown in photo. I've already disassembled it. You just need to take it away. You can also have the office chair. Located in South Loop near Clark St.", user_id: u1.id, winner_id: nil)
    l3 = Listing.create(location: "Compton", image_url: "https://images.craigslist.org/00909_1vzqKGtEOkpz_0t20CI_600x450.jpg", what_it_is: "Zen 3-D puzzle", category: "Games", description: "I'm selling a fancy, high-end zen puzzle with a 3-D feel to the pieces. The box itself and packaging is very nice, and this would make a great gift. The pieces themselves are very interesting shapes, with pieces the shapes of animals/other unique objects instead of the cookie-cutter jigsaw pieces.", user_id: u1.id, winner_id: nil)
    l4 = Listing.create(location: "Compton", image_url: "https://images.craigslist.org/00E0E_hgPKmrMDk5nz_0t20CI_600x450.jpg", what_it_is: "Livestrong Treadmill", category: "Exercise Equipment", description: "Currently isnt working, showing an error on the panel. Believe it needs a new motherboard.", user_id: u1.id, winner_id: nil)
    l5 = Listing.create(location: "Compton", image_url: "https://images.craigslist.org/00G0G_5bfk2Z45lx2z_05a03Q_600x450.jpg", what_it_is: "Free Dirt", category: "Landscaping", description: "Free dirt with about half cay…..the photo is old, but its the same dirt from last fall.clean soil no crap in it . 50%dirt and 50% clay. You can park in the alley at 152 North Euclid Ave Oak Park….just walk thru the green gate ….you will see it on your left in front of the garage……. 5or 7…..10 gal. buckets worth… Tim", user_id: u1.id, winner_id: nil)
    l6 = Listing.create(location: "Compton", image_url: "https://images.craigslist.org/00R0R_mNVnc0F9Jrz_0t90CI_600x450.jpg", what_it_is: "wheeled carry on travel bag", category: "Bags", description: "wheeled carry on travel bag", user_id: u1.id, winner_id: nil)
    l7 = Listing.create(location: "Compton", image_url: "https://assets.specialized.com/i/specialized/96120-41_ROLL-ELITE-LTD-BLK-CMLNGRN-HLGCP_FDSQ?bg=rgb(241,241,241)&w=2500&h=1406&fmt=auto", what_it_is: "Kush Cycle", category: "Bikes", description: "Flex on all your friends", user_id: u1.id, winner_id: nil)
puts "Done Seeding Listings!"

puts "Seeding Favorites....."
    f1 = Favorite.create(user_id: u1.id, listing_id: l1.id)
    f2 = Favorite.create(user_id: u2.id, listing_id: l1.id)
    f3 = Favorite.create(user_id: u3.id, listing_id: l1.id)
    f4 = Favorite.create(user_id: u4.id, listing_id: l1.id)
    f5 = Favorite.create(user_id: u5.id, listing_id: l1.id)
puts "Done Seeding Favorites!"
