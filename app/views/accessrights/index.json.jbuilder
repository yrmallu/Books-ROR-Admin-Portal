json.array!(@accessrights) do |accessright|
  json.extract! accessright, :id, :name, :description
  json.url accessright_url(accessright, format: :json)
end
