# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
    User.create(first_name: 'web', last_name: 'admin', username: 'webadmin',email: 'webadmin@cuelogic.co.in', password: '12345678', password_confirmation: '12345678', role_id: 1)
	User.create(first_name: 'school', last_name: 'admin', username: 'schooladmin',email: 'schooladmin@cuelogic.co.in', password: '12345678', password_confirmation: '12345678', role_id: 2)
	User.create(first_name: 'teacher', last_name: 'user', username: 'teacheruser',email: 'teacher@cuelogic.co.in', password: '12345678', password_confirmation: '12345678', role_id: 3)
	
	Role.create([{name: 'Web Admin'}, {name: 'School Admin'}, {name: 'Teacher'}, {name: 'Student'}])
    Accessright.create([{name: 'Create Web Admin'},{name: 'Delete Web Admin'},{name: 'Update Web Admin'},{name: 'View Web Admin'},{name: 'Create School Admin'},{name: 'Update School Admin'},{name: 'Delete School Admin'},{name: 'View School Admin'},{name: 'Create Teacher'},{name: 'Update Teacher'},{name: 'Delete Teacher'},{name: 'View Teacher'},{name: 'Create Student'},{name: 'View Student'},{name: 'Remove Student'},{name: 'Update Student'},{name: 'Create School'},{name: 'Update School'},{name: 'Delete School'},{name: 'View School'},{name: 'Can Manage Student'}])
	
