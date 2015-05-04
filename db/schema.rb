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

ActiveRecord::Schema.define(version: 20150504053533) do

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "age"
    t.string   "gender"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "password_digest"
    t.string   "remember_digest"
    t.integer  "levelNum"
    t.integer  "speedup"
    t.integer  "corrRow"
    t.integer  "gridSize"
    t.integer  "levelType"
    t.string   "color"
    t.integer  "group"
    t.integer  "attempts"
    t.string   "levelData"
    t.integer  "totalCorrect"
  end

  add_index "users", ["name"], name: "index_users_on_name", unique: true

end
