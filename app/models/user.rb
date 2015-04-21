class User < ActiveRecord::Base
  before_save {self.name = name.downcase}
  validates :name, presence: true, length: { maximum: 50 },uniqueness: { case_sensitive: false }
  validates :age, presence: true
  validates :gender, presence: true, length: { maximum: 1 }
  has_secure_password
  validates :password, length: { minimum: 6 }
end
