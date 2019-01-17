class Character

    attr_accessor :name, :actor, :movie, :show

    @@all = []

    def initialize (name, actor, params)
        @name = name
        @actor = actor
        @movie = params[:movie]
        @show = params[:show]
        @@all << self
    end

    def self.all
        @@all
    end 

    def num_of_appearances
        Character.all.select{|char| char.name == self.name}.length
    end

    def self.most_appearances
        all.max_by {|char| char.num_of_appearances}.name
    end

end