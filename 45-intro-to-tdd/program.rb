def is_palindrome?(string_of_chars)

  if string_of_chars.class != String || string_of_chars.length <= 1
    raise ArgumentError.new('Input must be a strin gof length that is greater than one')
  end

  string_of_chars = string_of_chars
    .gsub(/(\s|\p{P})/, '')
    .downcase

  string_of_chars == string_of_chars.reverse
end
