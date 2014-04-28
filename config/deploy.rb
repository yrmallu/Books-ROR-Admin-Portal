set :application, "books-that-grow-admin-portal"
set :repository,  "git@github.com:CuelogicTech/books-that-grow-admin-portal.git"
set :deploy_to, "/var/www/ruby_app/#{ application }"

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

set :scm, :git
set :scm_verbose, true
set :branch, "master"
set :user, "ubuntu"
# set :scm_passphrase, "password"
#set :use_sudo, false
default_run_options[:pty] = true
set :rails_env, "production"
set :deploy_via, :copy
set :ssh_options, { :forward_agent => true}
ssh_options[:keys] = %w(/Users/apple/Downloads/danielepub.pem)
set :keep_releases, 5
server "54.83.84.222", :app, :web, :db, :primary => true
# role :web, "54.225.184.100"                          # Your HTTP server, Apache/etc
# role :app, "54.225.184.100"                          # This may be the same as your `Web` server
# role :db,  "54.225.184.100", :primary => true # This is where Rails migrations will run
# role :db,  "54.225.184.100"

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts


# If you are using Passenger mod_rails uncomment this:
 namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
 # desc "Symlink shared config files"
 # task :symlink_config_files do
 #   run "#{ sudo } ln -s #{ deploy_to }/shared/config/database.yml #{ current_path }/config/database.yml"
 # end
 desc "Fix file permissions"
 task :fix_file_permissions, :roles => [ :app, :db, :web ] do
 sudo "chown -R g+rw #{current_path}/releases" 
 end 
 desc "Precompile assets after deploy"
 task :precompile_assets do
   run <<-CMD
     cd #{ current_path } &&
     #{ sudo } bundle exec rake assets:precompile RAILS_ENV=#{ rails_env }
   CMD
 end  
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
 end
 
 # after "deploy", "deploy:symlink_config_files"
 after "deploy", "deploy:restart"
 after "deploy", "deploy:cleanup"