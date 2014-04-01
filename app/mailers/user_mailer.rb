class UserMailer < ActionMailer::Base
  default from: 'notifications@example.com'
  
  def welcome_email(user_info)
 	#email = user_info[:email]
	email = 'kalyani.bagale@cuelogic.co.in'
    @username = user_info[:username]
    @link =  user_info[:link]
    @url  = user_info[:url]
	@reset_pass_url = user_info[:reset_pass_url]
	mail(to: email, subject: 'Welcome to Books That Grow')
  end
  
  def forgot_password_email(user_info)
  	#email = user_info[:email]
	email = 'kalyani.bagale@cuelogic.co.in'
	@username = user_info[:username]
    @link =  user_info[:link]
    @url  = user_info[:url]
	mail(to: email, subject: 'Forgot password for Books That Grow')
  end
  
end
