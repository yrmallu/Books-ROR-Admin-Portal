# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
    User.create!(first_name: 'web', last_name: 'admin', username: 'webadmin',email: 'webadmin@cuelogic.co.in', password: '12345678', password_confirmation: '12345678', role_id: 1)
    User.create!(first_name: 'web', last_name: 'jbuhle', username: 'jbuhle',email: 'jasonbuhle@gmail.com', password: 'jbuhle', password_confirmation: 'jbuhle', role_id: 1)
	
	web_admin_role = Role.create!(name: 'Web Admin')
 	
	create_book_right = Accessright.create!(name: 'Create Book')
	update_book_right = Accessright.create!(name: 'Update Book')
	view_book_right = Accessright.create!(name: 'View Book')
	delete_book_right = Accessright.create!(name: 'Delete Book')
	update_accessright_right = Accessright.create!(name: 'Update Accessright')
 	view_accessright_right = Accessright.create!(name: 'View Accessright')
	
	web_admin_role.accessrights <<  create_book_right
	web_admin_role.accessrights <<  update_book_right
	web_admin_role.accessrights <<  view_book_right
	web_admin_role.accessrights <<  delete_book_right
	web_admin_role.accessrights <<  update_accessright_right
	web_admin_role.accessrights <<  view_accessright_right
	
	
	Role.create!([{name: 'School Admin'}, {name: 'Teacher'}, {name: 'Student'}])
    
	Accessright.create!([{name: 'Create School Admin'},{name: 'Update School Admin'},{name: 'Delete School Admin'},{name: 'View School Admin'},{name: 'Create Teacher'},{name: 'Update Teacher'},{name: 'Delete Teacher'},{name: 'View Teacher'},{name: 'Create Student'},{name: 'View Student'},{name: 'Delete Student'},{name: 'Update Student'},{name: 'Create School'},{name: 'Update School'},{name: 'Delete School'},{name: 'View School'},{name: 'Can Manage Student'},{name: 'Create Class'},{name: 'Update Class'},{name: 'Delete Class'},{name: 'View Class'},{name: 'Create License'},{name: 'Update License'},{name: 'Delete License'},{name: 'View License'}])
	 
	ReadingGrade.create!([{grade_short: '2',grade_name: 'C',grade_name_short: '2'},{grade_short: '3',grade_name: 'D',grade_name_short: '3'},{grade_short: '4',grade_name: 'E',grade_name_short: '4'},{grade_short: '5',grade_name: 'F',grade_name_short: '5'},{grade_short: '6',grade_name: 'G',grade_name_short: '6'},{grade_short: '7',grade_name: 'H',grade_name_short: '7'},{grade_short: '8',grade_name: 'I',grade_name_short: '8'},{grade_short: '9',grade_name: 'J',grade_name_short: '9'},{grade_short: '10',grade_name: 'K',grade_name_short: '10'},{grade_short: '11',grade_name: 'L',grade_name_short: '11'},{grade_short: '12',grade_name: 'M',grade_name_short: '12'}])
	
	
	