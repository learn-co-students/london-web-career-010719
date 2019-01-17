class Show

    attr_accessor :name

    @@all = []

    def initialize (name)
        @name = name
        @@all << self
    end

    def self.all
        @@all
    end 

    def characters
        Character.all.select{|char| char.show == self}
    end

    def actors
        characters.map{|char| char.actor }
    end

    def on_the_big_screen
        !!Movie.all.find{|movie| movie.name == self.name}
    end

    def self.on_the_big_screen
        all.select{|show| show.on_the_big_screen}
    end
end