json.array!(@schools) do |school|
  json.extract! school, :id, :code, :name, :address, :city, :district, :state, :country, :phone
  json.url school_url(school, format: :json)
end
