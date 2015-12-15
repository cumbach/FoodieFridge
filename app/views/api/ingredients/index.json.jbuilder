json.array!(@ingredients) do |ingredient|
  json.partial!('ingredient', ingredient: ingredient)
end
