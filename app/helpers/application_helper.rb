module ApplicationHelper
  def check_checked(accessright,accessrights)
    return "checked" if accessrights.include?(accessright) unless accessrights.blank?
    return false
  end
  
  def link_to_add_fields(name, f, association, options='')
    new_object = f.object.send(association).klass.new
    id = new_object.object_id
    fields = f.fields_for(association, new_object, child_index: id) do |builder|
      if options == '' 
	    render(association.to_s.singularize + "_fields", f: builder)
      else
	    render(options[:options] + "_fields", f: builder)
      end
	end
    link_to(name, 'javascript:void(0)', class: "add_fields", data: {id: id, fields: fields.gsub("\n", "")})
  end


  def url_with_protocol(url)
    /^http/.match(url) ? url : "http://#{url}"
  end

   # def link_to_add_fields(name, f, association)
#      new_object = f.object.send(association).klass.new
#      id = new_object.object_id
#      fields = f.fields_for(association, new_object, child_index: id) do |builder|
#        render(association.to_s.singularize + "_fields", f: builder)
#      end
#      link_to(name, 'javascript:void(0)', class: "add_fields", data: {id: id, fields: fields.gsub("\n", "")})
#    end


end
