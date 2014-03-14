json.array!(@books) do |book|
  json.extract! book, :id, :title, :description, :author, :images, :book_file_name, :chapters, :book_unique_id
  json.url book_url(book, format: :json)
end
