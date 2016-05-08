json.array!(@strategies) do |strategy|
  json.extract! strategy, :id, :content
  json.url strategy_url(strategy, format: :json)
end
