module CommonQueries
  extend ActiveSupport::Concern

  included do
	default_scope {where(delete_flag: false)}
    #scope :by_newest, -> {order("created_at DESC")}
    #default_scope {by_newest}
  end

end  

