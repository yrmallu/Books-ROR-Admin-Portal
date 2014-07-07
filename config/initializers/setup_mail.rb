ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.raise_delivery_errors = true
# ActionMailer::Base.smtp_settings = {  
#       :address              => "smtp.gmail.com",  
#       :port                 => 587,  
#       :domain               => "gmail.com",  
#       :user_name            => "cuelogic.test.acc@gmail.com",
#       :password             => "cuelogic",
#       :authentication       => "plain",  
#       :enable_starttls_auto => true  
#     }

ActionMailer::Base.smtp_settings = {  
    :address              => "smtpout.secureserver.net",  
    :port                 => 80,  
    :domain               => "booksthatgrow.com",  
    :user_name            => "noreply@booksthatgrow.com",
    :password             => "bornedigital",
    :authentication       => "plain",  
    :enable_starttls_auto => true      
}

