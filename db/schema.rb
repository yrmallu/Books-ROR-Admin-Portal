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

ActiveRecord::Schema.define(version: 20140418134603) do

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

  create_table "books", force: true do |t|
    t.string  "title"
    t.text    "description"
    t.string  "author"
    t.hstore  "preview_name"
    t.string  "book_file_name"
    t.integer "chapters"
    t.string  "book_unique_id"
    t.hstore  "thumb_name"
    t.string  "cover"
    t.string  "interest_level", limit: 60
    t.string  "delete_flag",    limit: 2
  end

  create_table "classroom_books", force: true do |t|
    t.integer "classroom_id"
    t.integer "book_id"
    t.integer "user_id"
  end

  create_table "classrooms", force: true do |t|
    t.integer  "code"
    t.string   "name"
    t.string   "cover_image"
    t.string   "secret_key"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.hstore   "classroom_count"
    t.integer  "school_id"
    t.boolean  "delete_flag"
    t.date     "school_year_start_date"
    t.date     "school_year_end_date"
  end

  create_table "images", force: true do |t|
    t.string   "name"
    t.string   "book_cover_file_name"
    t.string   "book_cover_content_type"
    t.integer  "book_cover_file_size"
    t.datetime "book_cover_updated_at"
    t.string   "book_cover_large_file_name"
    t.string   "book_cover_large_content_type"
    t.integer  "book_cover_large_file_size"
    t.datetime "book_cover_large_updated_at"
    t.string   "preview_book_image_file_name"
    t.string   "preview_book_image_content_type"
    t.integer  "preview_book_image_file_size"
    t.datetime "preview_book_image_updated_at"
    t.string   "epub_book_file_name"
    t.string   "epub_book_content_type"
    t.integer  "epub_book_file_size"
    t.datetime "epub_book_updated_at"
    t.integer  "book_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "licenses", force: true do |t|
    t.date     "expiry_date"
    t.integer  "no_of_licenses"
    t.integer  "used_liscenses",     default: 0
    t.integer  "school_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "delete_flag"
    t.string   "license_batch_name"
  end

  create_table "notes", force: true do |t|
    t.integer "user_id"
    t.integer "book_id"
    t.text    "note_data"
  end

  create_table "parents", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "reading_grades", force: true do |t|
    t.string   "grade_short"
    t.string   "grade_name"
    t.string   "grade_name_short"
    t.datetime "created_at"
    t.datetime "updated_at"
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
    t.boolean  "delete_flag", default: false
  end

  create_table "user_accessrights", force: true do |t|
    t.integer  "user_id"
    t.integer  "accessright_id"
    t.boolean  "access_flag"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "role_id"
  end

  create_table "user_books", id: false, force: true do |t|
    t.integer "id",                 limit: 8
    t.hstore  "reading_percentage"
    t.hstore  "last_reading_info"
    t.integer "user_id",            limit: 8
    t.string  "device_id"
    t.integer "book_id"
    t.string  "reading_info"
  end

  create_table "user_classrooms", force: true do |t|
    t.integer "user_id"
    t.integer "classroom_id"
    t.integer "role_id"
  end

  create_table "userlevel_settings", force: true do |t|
    t.integer  "book_id"
    t.integer  "user_id"
    t.integer  "book_changed_id"
    t.integer  "classroom_id"
    t.integer  "teacher_id"
    t.integer  "status"
    t.integer  "school_id"
    t.integer  "userlevel"
    t.string   "reference"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "username"
    t.date     "license_expiry_date"
    t.boolean  "delete_flag",             default: false
    t.string   "email",                   default: "",    null: false
    t.integer  "device_id"
    t.integer  "role_id"
    t.integer  "school_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.hstore   "userinfo"
    t.string   "password_digest"
    t.integer  "license_id"
    t.string   "assign_reading_based_on"
    t.string   "photos_file_name"
    t.string   "photos_content_type"
    t.integer  "photos_file_size"
    t.datetime "photos_updated_at"
  end

  add_index "users", ["role_id"], name: "index_users_on_role_id", using: :btree
  add_index "users", ["school_id"], name: "index_users_on_school_id", using: :btree

  create_table "users_bk", id: false, force: true do |t|
    t.integer  "id",                  limit: 8, default: "nextval('users_id_seq'::regclass)", null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "username"
    t.date     "license_expiry_date"
    t.boolean  "delete_flag",                   default: false
    t.string   "email",                         default: "",                                  null: false
    t.integer  "device_id"
    t.integer  "role_id"
    t.integer  "school_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.hstore   "userinfo"
    t.string   "password_digest"
    t.integer  "license_id"
  end

end
