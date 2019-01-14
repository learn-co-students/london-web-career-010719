class Actor

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
        Character.all.select {|char| char.actor == self}
    end

    def characters_in_movies
        characters.select{|char| char.movie}
    end

    def characters_in_shows
        characters.select{|char| char.show}
    end

    def movies
        characters_in_movies.map{|char| char.movie}.uniq
    end

    def shows
        characters_in_shows.map{|char| char.show}.uniq
    end

end