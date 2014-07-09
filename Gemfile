source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.3'

# Use sqlite3 as the database for Active Record
#gem 'sqlite3'

# Use postgresql as the database for Active Record
gem 'pg', '0.17.1'
#gem 'rails-env-favicon'

# Use SCSS for stylesheets
gem 'sass-rails', '4.0.2'

#gem 'cancan', github: 'ryanb/cancan', branch: '2.0'
gem 'cancan', :github => 'ryanb/cancan', :branch => '2.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '2.5.0'

# Use CoffeeScript for .js.coffee assets and views
#gem 'coffee-rails', '4.0.1'

gem 'kaminari', '0.15.1'

gem 'annotate', '2.6.2'

gem 'roo', '1.13.2'

# provides country and subregion information
gem 'carmen-rails', '1.0.1'

# provide uploading functionality 
gem 'paperclip', '4.1.1'
gem "puma",         "~> 2.7.1"

# Use ActiveModel has_secure_password
gem 'bcrypt-ruby', '3.1.5'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
gem 'therubyracer', :platforms => :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails', '3.1.0'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks', '2.2.1'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '2.0.4'

gem 'epub-parser', '0.1.5'

gem 'rubyzip', '< 1.0.0'
# gem 'rubyzip', :git => 'git://github.com/davidhooey/rubyzip.git'
# gem 'rubyzip', '~> 1.1.3', :require => 'zip'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  #gem 'sdoc', '0.4.0',  require: false
  gem 'sdoc', '0.4.0',  :require => false
end

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
gem 'capistrano', '2.15.5'

group :development do
 gem 'letter_opener', '1.2.0'
end

group :production do
   gem 'rails_12factor', '0.0.2' 
end

group :development, :test do
  gem 'rspec-rails', '2.14.1'  
  gem 'factory_girl_rails', '4.4.1'
  gem 'debugger', '1.6.6'
  gem 'pry', '0.9.12.6'
  gem 'hirb', '0.7.1'
end

group :test do
  gem 'capybara', '2.2.1'
  gem 'database_cleaner', '1.2.0'
  gem 'email_spec', '1.5.0'
  gem 'shoulda-matchers', '2.6.1'
end
