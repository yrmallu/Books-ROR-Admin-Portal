json.array!(@classrooms) do |classroom|
  json.extract! classroom, :id, :code, :name, :cover_image, :secret_key, :classroom_count
  json.url classroom_url(classroom, format: :json)
end
