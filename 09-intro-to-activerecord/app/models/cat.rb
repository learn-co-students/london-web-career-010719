class Cat < ActiveRecord::Base
  def meow
    'MEOWWWWWWWWWW'
  end

  def is_old
    if self.age > 20
      'i am quite an old cat'
    else
      'yo'
    end
  end
end
