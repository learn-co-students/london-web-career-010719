require_relative '../program'

describe 'is_palindrome?' do
  it 'should return true if the string is a palindrome' do
    expect(is_palindrome?('kayak')).to be(true)
  end

  it 'should return false if the string is not a palindrome' do
    expect(is_palindrome?('kayak3')).to be(false)
  end

  it 'should return true if the input has spaces and is a palindrome' do
    expect(is_palindrome?('a lad name e mandala')).to be(true)
  end

  it 'should return false if the input has spaces and is not a palindrome' do
    expect(is_palindrome?('a lad name e mandala3')).to be(false)
  end

  it 'should return true if the input has spaces, capital letters, and is a palindrome' do
    expect(is_palindrome?('A lAd namE e mandala')).to be(true)
  end

  it 'should return false if the input has spaces, capital letters, and is not a palindrome' do
    expect(is_palindrome?('A lAd namE e mandala3')).to be(false)
  end

  it 'should return true if the input has spaces, capital letters, has punctuation, and is a palindrome' do
    expect(is_palindrome?('Eva, can I see bees in a cave?')).to be(true)
  end

  it 'should return false if the input has spaces, capital letters, has punctuation, and is not a palindrome' do
    expect(is_palindrome?('Eva, can I see bees in a box?')).to be(false)
  end

  it 'should raise an error if given an int' do
    expect { is_palindrome?(131) }.to raise_error(ArgumentError)
  end

  it 'should raise an error if given nil' do
    expect { is_palindrome?(nil) }.to raise_error(ArgumentError)
  end

  it 'should raise an error if the string is of length zero' do
    expect { is_palindrome?('') }.to raise_error(ArgumentError)
  end

  it 'should raise an error if the string is of length one' do
    expect { is_palindrome?('a') }.to raise_error(ArgumentError)
  end

end
