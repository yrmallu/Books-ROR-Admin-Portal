json.array!(@licenses) do |license|
  json.extract! license, :id, :license_group_id, :datetime, :no_of_licenses, :allocated_to, :used_liscenses, :school_id
  json.url license_url(license, format: :json)
end
