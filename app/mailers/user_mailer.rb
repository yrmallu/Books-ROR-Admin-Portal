class UserMailer < ActionMailer::Base
  default from: 'notifications@example.com'
  
  def forgot_password_email(user_info)
  	#email = user_info[:email]
	email = 'bagale.kalyani@gmail.com'
	@username = user_info[:username]
    @link =  user_info[:link]
    @url  = user_info[:url]
    mail(to: email, subject: 'Forgot password for Books That Grow')
  end
  
end
