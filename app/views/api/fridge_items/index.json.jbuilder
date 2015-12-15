json.array!(@fridge_items) do |fridge_item|
  json.partial!('fridgeitem', fridge_item: fridge_item)
end
