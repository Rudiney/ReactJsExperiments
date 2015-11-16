require 'webrick'
require 'json'

port = ENV['PORT'].nil? ? 3000 : ENV['PORT'].to_i

puts "Server started: http://localhost:#{port}/"

root = File.expand_path './public'
server = WEBrick::HTTPServer.new Port: port, DocumentRoot: root

server.mount_proc '/aulas.json' do |req, res|
	aulas = {}
	10.upto(16) do |d|
		dia = "#{d}/11/2015"
		aulas[dia] = {}
		6.upto(22) do |hora|
			aulas[dia][hora] = []
			rand(5).times do |x|
				aulas[dia][hora] << {
					aluno: %w{Rudi Manu Pedro Paulo Jose Luiz}.sample, 
					day: dia, 
					hour: hora, 
					id: "#{dia}#{hora}#{x}", 
					presence: %w{presente falta falta-justificada}.sample
				}
			end
		end
	end

  res['Content-Type'] = 'application/json'
  res['Cache-Control'] = 'no-cache'
  res.body = aulas.to_json
end

trap('INT') { server.shutdown }

server.start