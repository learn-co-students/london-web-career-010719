class Movie

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
        Character.all.select{|char| char.movie == self}
    end

    def actors
        characters.map{|char| char.actor }
    end

    def self.most_actors
        # should return the movie which has the most actors in it
        all.max_by do |movie|
            movie.actors.length
        end
    end

end