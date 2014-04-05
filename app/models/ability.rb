class Ability
  include CanCan::Ability

  def initialize(user)
      if user.is_web_admin?
        can :manage, :all
      else 
        user_rights = user.user_permission_names.collect{|i| i.name}
		
        can :create, School if user_rights.include?("Create School")
        can :read, School if user_rights.include?("View School")
        can [:destroy, :read], School if user_rights.include?("Delete School")
        can [:update, :read], School if user_rights.include?("Update School")
		 
        can :create, School if user_rights.include?("Create School Admin")
        can :read, School if user_rights.include?("View School Admin")
        can [:destroy, :read], School if user_rights.include?("Delete School Admin")
        can [:update, :read], School if user_rights.include?("Update School Admin")
		
        can :create, School if user_rights.include?("Create Teacher")
        can :read, School if user_rights.include?("View Teacher")
        can [:destroy, :read], School if user_rights.include?("Delete Teacher")
        can [:update, :read], School if user_rights.include?("Update Teacher")
		
        can :create, School if user_rights.include?("Create Teacher")
        can :read, School if user_rights.include?("View Teacher")
        can [:destroy, :read], School if user_rights.include?("Delete Teacher")
        can [:update, :read], School if user_rights.include?("Update Teacher")
		
        can :create, School if user_rights.include?("Create Student")
        can :read, School if user_rights.include?("View Student")
        can [:destroy, :read], School if user_rights.include?("Delete Student")
        can [:update, :read], School if user_rights.include?("Update Student")
		
	  end
  
    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user 
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on. 
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/ryanb/cancan/wiki/Defining-Abilities
  end
end
