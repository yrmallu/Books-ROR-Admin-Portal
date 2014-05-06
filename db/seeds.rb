# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
    User.create(first_name: 'web', last_name: 'admin', username: 'webadmin',email: 'webadmin@cuelogic.co.in', password: '12345678', password_confirmation: '12345678', role_id: 1)
	User.create(first_name: 'web', last_name: 'jbuhle', username: 'jbuhle',email: 'jasonbuhle@gmail.com', password: 'jbuhle', password_confirmation: 'jbuhle', role_id: 1)
	
	Role.create([{name: 'Web Admin'}, {name: 'School Admin'}, {name: 'Teacher'}, {name: 'Student'}])
    Accessright.create([{name: 'Create School Admin'},{name: 'Update School Admin'},{name: 'Delete School Admin'},{name: 'View School Admin'},{name: 'Create Teacher'},{name: 'Update Teacher'},{name: 'Delete Teacher'},{name: 'View Teacher'},{name: 'Create Student'},{name: 'View Student'},{name: 'Delete Student'},{name: 'Update Student'},{name: 'Create School'},{name: 'Update School'},{name: 'Delete School'},{name: 'View School'},{name: 'Can Manage Student'},{name: 'Create Classroom'},{name: 'Update Classroom'},{name: 'Delete Classroom'},{name: 'View Classroom'},{name: 'Create License'},{name: 'Update License'},{name: 'Delete License'},{name: 'View License'}])
	
	ReadingGrade.create([{grade_short: 'K',grade_name: 'Kindergarten',grade_name_short:'Kg'},{grade_short: '1',grade_name: 'Grade 1',grade_name_short:'1st'},{grade_short: '2',grade_name: 'Grade 2',grade_name_short:'2nd'},{grade_short: '3',grade_name: 'Grade 3',grade_name_short:'3rd'},{grade_short: '4',grade_name: 'Grade 4',grade_name_short:'4th'},{grade_short: '5',grade_name: 'Grade 5',grade_name_short:'5th'},{grade_short: '6',grade_name: 'Grade 6',grade_name_short:'6th'},{grade_short: '7',grade_name: 'Grade 7',grade_name_short:'7th'},{grade_short: '8',grade_name: 'Grade 8',grade_name_short:'8th'},{grade_short: '9',grade_name: 'Grade 9',grade_name_short:'9th'},{grade_short: '10',grade_name: 'Grade 10',grade_name_short:'10th'},{grade_short: '11',grade_name: 'Grade 11',grade_name_short:'11th'},{grade_short: '12',grade_name: 'Grade 12',grade_name_short:'12th'}])