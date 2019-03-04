class ImageSerializer < ActiveModel::Serializer
  attributes :id, :name, :url, :like_count, :comments
  has_many :comments

  class CommentSerializer < ActiveModel::Serializer
    attributes :id, :content
  end
end
