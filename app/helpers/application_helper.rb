module ApplicationHelper
  def check_checked(accessright,accessrights)
     return "checked" if accessrights.include?(accessright) unless accessrights.blank?
     return false
  end
end
