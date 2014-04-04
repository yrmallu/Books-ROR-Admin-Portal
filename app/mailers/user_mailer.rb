class UserMailer < ActionMailer::Base
  default from: 'notifications@example.com'
  
  def welcome_email(user_info)
 	#@email = user_info[:email]
	@email = 'kalyani.bagale@cuelogic.co.in'
    @username = user_info[:username]
    @link =  user_info[:link]
    @login_url  = user_info[:login_url]
	@reset_pass_url = user_info[:reset_pass_url]
	mail(to: @email, subject: 'Welcome to Books That Grow.')
  end
  
  def user_details_changed(user_info)
 	#@email = user_info[:email]
	@email = 'kalyani.bagale@cuelogic.co.in'
    @username = user_info[:username]
	@logged_in_user = user_info[:current_user]
	@changed_values = user_info[:changed_values]
    @link =  user_info[:link]
    @login_url  = user_info[:login_url]
	@reset_pass_url = user_info[:reset_pass_url]
	mail(to: @email, subject: 'Books That Grow Account information changed.')
  end
  
  def user_email_changed(user_info)
 	#@email = user_info[:email]
	@email = 'kalyani.bagale@cuelogic.co.in'
    @username = user_info[:username]
	@logged_in_user = user_info[:current_user]
	@new_email = user_info[:new_email]
    @link =  user_info[:link]
    @login_url  = user_info[:login_url]
	@reset_pass_url = user_info[:reset_pass_url]
	mail(to: @email, subject: 'Books That Grow Account Email Address changed.')
  end
  
  def user_password_changed(user_info)
 	#@email = user_info[:email]
	@email = 'kalyani.bagale@cuelogic.co.in'
    @username = user_info[:username]
	@logged_in_user = user_info[:current_user]
	@new_email = user_info[:new_email]
    @link =  user_info[:link]
    @login_url  = user_info[:login_url]
	@reset_pass_url = user_info[:reset_pass_url]
	mail(to: @email, subject: 'Books That Grow Account Password changed.')
  end
  
  def forgot_password_email(user_info)
  	@email = user_info[:email]
	#@email = 'kalyani.bagale@cuelogic.co.in'
	@username = user_info[:username]
    @link =  user_info[:link]
    @url  = user_info[:url]
	mail(to: @email, subject: 'Forgot password for Books That Grow.')
  end
  
end
