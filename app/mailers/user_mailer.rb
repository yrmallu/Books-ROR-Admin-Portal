class UserMailer < ActionMailer::Base
  default from: 'noreply@booksthatgrow.com'
  
  def welcome_email(user_info)
    @user_info = user_info
    mail(to: @user_info[:email], subject: 'Welcome to Books That Grow!')
  end

  def user_details_changed(user_info)
    @user_info = user_info
    if @user_info[:password_changed].blank?
      mail(to: @user_info[:email], subject: 'Your Books That Grow account has been updated')
    else
      mail(to: @user_info[:email], subject: 'Your Books That Grow password has been reset')
    end
  end

  def user_email_changed(user_info)
    @user_info = user_info
    mail(to: @user_info[:email], subject: 'Books That Grow Account email changed')
  end

  def forgot_password_email(user_info)
    @user_info = user_info
    if @user_info[:role].eql?('Student')
      mail(to: @user_info[:email], subject: "Books That Grow password reset request for #{@user_info[:full_name]}")
    else
      mail(to: @user_info[:email], subject: "Books That Grow password reset request")
    end 
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

  def password_reset_email(user_info)
    @user_info = user_info
    mail(to: @user_info[:email], subject: 'Your Books That Grow password has been reset')
  end

end
