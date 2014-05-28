class UserMailer < ActionMailer::Base
  default from: 'noreply@borne-digital.com'
  
  def welcome_email(user_info)
    @user_info = user_info
    #@email = user_info[:email]
	  # @firstname = user_info[:firstname]
	  # @lastname = user_info[:lastname]
	  # @username = user_info[:username]
   #  @link =  user_info[:link]
   #  @login_url  = user_info[:login_url]
   #  @reset_pass_url = user_info[:reset_pass_url]
    mail(to: @user_info[:email], subject: 'Welcome to Books That Grow!')
  end

  def user_details_changed(user_info)
    @user_info = user_info
   #  @email = user_info[:email]
   #  @changed_attributes = user_info[:changed_attributes]
   #  @username = user_info[:username]
	  # @name = user_info[:name]
   #  @logged_in_user = user_info[:current_user]
   #  @link =  user_info[:link]
   #  @login_url  = user_info[:login_url]
   #  @reset_pass_url = user_info[:reset_pass_url]
    mail(to: @user_info[:email], subject: 'Your Books That Grow account has been updated.')
  end

  def user_email_changed(user_info)
    @user_info = user_info
   #  @email = user_info[:email]
   #  @changed_attributes = user_info[:changed_attributes]	
   #  @username = user_info[:username]
	  # @name = user_info[:name]
   #  @logged_in_user = user_info[:current_user]
   #  @new_email = user_info[:new_email]
   #  @link =  user_info[:link]
   #  @login_url  = user_info[:login_url]
   #  @reset_pass_url = user_info[:reset_pass_url]
    mail(to: @user_info[:email], subject: 'Books That Grow Account Email Address changed.')
  end

  def forgot_password_email(user_info)
    @user_info = user_info
  #     @email = user_info[:email]
  # @name = user_info[:name]
  # @username = user_info[:username]
  #     @link =  user_info[:link]
  #     @url  = user_info[:url]
    mail(to: @user_info[:email], subject: 'Forgot password for Books That Grow.')
  end
  
  # def user_password_changed(user_info)
#     @email = user_info[:email]
#     @username = user_info[:username]
#     @logged_in_user = user_info[:current_user]
#     @new_email = user_info[:new_email]
#     @link =  user_info[:link]
#     @login_url  = user_info[:login_url]
#     @reset_pass_url = user_info[:reset_pass_url]
#     mail(to: @email, subject: 'Books That Grow Account Password changed.')
#   end

  

end
