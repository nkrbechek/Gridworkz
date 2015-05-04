class User < ActiveRecord::Base
  attr_accessor :remember_token
  before_save {self.name = name.downcase}
  validates :name, presence: true, length: { maximum: 50 },uniqueness: { case_sensitive: false }
  validates :age, presence: true
  validates :gender, presence: true, length: { maximum: 1 }
  has_secure_password
  validates :password, length: { minimum: 6 }
  after_initialize :init
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end
  # Returns a random token.
  def User.new_token
    SecureRandom.urlsafe_base64
  end
   def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end
   # Returns true if the given token matches the digest.
  def authenticated?(remember_token)
  	return false if remember_digest.nil?
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end
  # Forgets a user.
  def forget
    update_attribute(:remember_digest, nil)
  end
  def init
    self.levelNum ||= 1
    self.speedup ||=1
    self.corrRow ||=0
    self.gridSize ||= 3
    self.levelType ||= 0
    self.color ||= "blue"
    self.group ||= 0+rand(2)
    self.attempts ||=0
    self.totalCorrect ||=0
  end
end
