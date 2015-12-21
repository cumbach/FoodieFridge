json.array!(@primaries) do |primary|
  json.partial!('primary', primary: primary)
end
