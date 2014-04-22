class Ability
  include CanCan::Ability

  def initialize(user)
      if user.is_web_admin?
        can :access, :all
      else 
        user_rights = user.user_permission_names.collect{|i| i.name}
		p "final accessrights=====",user_rights

		can :create, :users, :role_id => user.role_id if user_rights.include?("Create School Admin")
 		can :create, :users, :role_id => user.role_id if user_rights.include?("Create Teacher")
 		can :create, :users, :role_id => user.role_id if user_rights.include?("Create Student")
		can :create_sa, :users if user_rights.include?("Create School Admin")
		can :create_teacher, :users if user_rights.include?("Create Teacher")
		can :create_student, :users if user_rights.include?("Create Student")
		can :manage_student, :users if user_rights.include?("Can Manage Student")
		
		can :read, :users, :role_id => user.role_id if user_rights.include?("View Web Admin")
		can :read, :users, :role_id => user.role_id if user_rights.include?("View School Admin")
		can :read, :users, :role_id => user.role_id if user_rights.include?("View Teacher")
		can :read, :users, :role_id => user.role_id if user_rights.include?("View Student")
		can :read_sa, :users if user_rights.include?("View School Admin")
		can :read_teacher, :users if user_rights.include?("View Teacher")
		can :read_student, :users if user_rights.include?("View Student")
		can :manage_student, :users if user_rights.include?("Can Manage Student")
		
		can [:update, :read], :users, :role_id => user.role_id if user_rights.include?("Update School Admin")
		can [:update, :read], :users, :role_id => user.role_id if user_rights.include?("Update Teacher")
		can [:update, :read], :users, :role_id => user.role_id if user_rights.include?("Update Student")
		can [:update_sa, :read_sa], :users if user_rights.include?("Update School Admin")
		can [:update_teacher, :read_teacher], :users if user_rights.include?("Update Teacher")
		can [:update_student, :read_student], :users if user_rights.include?("Update Student")
		can :manage_student, :users if user_rights.include?("Can Manage Student")
		
		can [:destroy, :read], :users, :role_id => user.role_id if user_rights.include?("Delete School Admin")
		can [:destroy, :read], :users, :role_id => user.role_id if user_rights.include?("Delete Teacher")
		can [:destroy, :read], :users, :role_id => user.role_id if user_rights.include?("Delete Student")
		can [:destroy_sa, :read], :users if user_rights.include?("Delete School Admin")
		can [:destroy_teacher, :read], :users if user_rights.include?("Delete Teacher")
		can [:destroy_student, :read], :users if user_rights.include?("Delete Student")
		can :manage_student, :users if user_rights.include?("Can Manage Student")
		
		can :create, :schools if user_rights.include?("Create School")
        can :read, :schools if user_rights.include?("View School")
        can [:destroy, :read], :schools if user_rights.include?("Delete School")
        can [:update, :read], :schools if user_rights.include?("Update School")
		
        can :create, :classrooms if user_rights.include?("Create Classroom")
        can :read, :classrooms if user_rights.include?("View Classroom")
        can [:destroy, :read], :classrooms if user_rights.include?("Delete Classroom")
        can [:update, :read], :classrooms if user_rights.include?("Update Classroom")
		
        can :create, :licenses if user_rights.include?("Create License")
        can :read, :licenses if user_rights.include?("View License")
        can [:destroy, :read], :licenses if user_rights.include?("Delete License")
        can [:update, :read], :licenses if user_rights.include?("Update License")
		
		 
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
