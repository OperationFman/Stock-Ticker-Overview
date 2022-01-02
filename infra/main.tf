provider "aws" {
    region = "ap-southeast-2"
    profile = "default"
    access_key = "${ACCESS_KEY}" 
    secret_key = "${SECRET_KEY}"
}

resource "aws_instance" "ec2_tracker_instance" {
    ami = "ami-0bd2230cfb28832f7"
    instance_type = "t2.micro"
    security_groups = [aws_security_group.ssh_security.name, aws_security_group.default_security.name]
    user_data = "${file("installer.sh")}"
    iam_instance_profile = aws_iam_instance_profile.default_profile.id

     tags = {
        name = "ec2-tracker-instance"
     }
}
