# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

<<<<<<< HEAD
ActiveRecord::Schema.define(version: 20140327123713) do
=======
ActiveRecord::Schema.define(version: 20140327061656) do
>>>>>>> d1e175344476812eec19a486491c50c15a55be95

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "accessrights", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "accessrights_roles", id: false, force: true do |t|
    t.integer "accessright_id"
    t.integer "role_id"
  end

<<<<<<< HEAD
  create_table "books", force: true do |t|
    t.string   "title"
    t.string   "description"
    t.string   "author"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "book_cover_file_name"
    t.string   "book_cover_content_type"
    t.integer  "book_cover_file_size"
    t.datetime "book_cover_updated_at"
    t.string   "epub_book_file_name"
    t.string   "epub_book_content_type"
    t.integer  "epub_book_file_size"
    t.datetime "epub_book_updated_at"
  end

=======
>>>>>>> d1e175344476812eec19a486491c50c15a55be95
  create_table "classrooms", force: true do |t|
    t.integer  "code"
    t.string   "name"
    t.string   "cover_image"
    t.string   "secret_key"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.hstore   "classroom_count"
  end

  create_table "licenses", force: true do |t|
    t.integer  "license_group_id"
    t.date     "expiry_date"
    t.integer  "no_of_licenses"
    t.integer  "used_liscenses"
    t.integer  "school_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.hstore   "allocated_to"
  end

  create_table "roles", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "schools", force: true do |t|
    t.integer  "code"
    t.string   "name"
    t.string   "address"
    t.string   "city"
    t.string   "district"
    t.string   "state"
    t.string   "country"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "delete_flag"
  end

  create_table "user_accessrights", force: true do |t|
    t.integer  "user_id"
    t.integer  "accessright_id"
    t.boolean  "access_flag"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "role_id"
  end

  create_table "user_classrooms", force: true do |t|
    t.integer "user_id"
    t.integer "classroom_id"
    t.integer "user_type"
  end

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "username"
    t.date     "license_expiry_date"
    t.boolean  "delete_flag",         default: false
    t.string   "email",               default: "",    null: false
    t.integer  "device_id"
    t.integer  "role_id"
    t.integer  "school_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.hstore   "userinfo"
    t.string   "password_digest"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["role_id"], name: "index_users_on_role_id", using: :btree
  add_index "users", ["school_id"], name: "index_users_on_school_id", using: :btree

end
