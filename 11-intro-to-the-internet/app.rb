require "pry"


class App
  def self.homepage
    "<h1>WELCOME HOME, FAILS</h1>"
  end

  def call(environment_hash)
    req = Rack::Request.new(environment_hash)
    resp = Rack::Response.new
    # binding.pry

    if req.path == "/"
      resp.write(App.homepage)
      resp.status = 200
    elsif req.path == "/fails"
        resp.write('matt, shane....')
        resp.status
    else
      resp.write("THIS IS BAD... 404")
      resp.status = 404
    end

    resp.finish
  end
end