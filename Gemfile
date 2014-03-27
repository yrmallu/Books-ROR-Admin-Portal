source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.3'

# Use sqlite3 as the database for Active Record
#gem 'sqlite3'

# Use postgresql as the database for Active Record
gem 'pg', '0.17.1'

# Use devise for Authentication
gem 'devise', '3.2.4'
gem 'cancan', '1.6.10'

# Use SCSS for stylesheets
gem 'sass-rails', '4.0.2'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '2.5.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '4.0.1'

gem 'kaminari', '0.15.1'

gem 'annotate', '2.6.2'

gem 'carmen-rails'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails', '3.1.0'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks', '2.2.1'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '2.0.4'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', '0.4.0',  require: false
end

# Use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.1.2'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]
group :development do
 gem 'letter_opener', '1.2.0'
end

group :development, :test do
  gem 'rspec-rails', '2.14.1'  
  gem 'factory_girl_rails', '4.4.1'
  gem 'debugger', '1.6.6'
end

group :test do
  #gem 'cucumber-rails', '1.4.0', :require => false
  gem 'capybara', '2.2.1'
  gem 'database_cleaner', '1.2.0'
  gem 'email_spec', '1.5.0'
  gem 'shoulda-matchers', '2.5.0'
end
