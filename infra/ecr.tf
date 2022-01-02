resource "aws_ecr_repository" "stocktracker" {
    name = "stocktracker"
    image_tag_mutability = "IMMUTABLE" 

  image_scanning_configuration {
    scan_on_push = false
  }
}