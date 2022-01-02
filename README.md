# Stock-Overview
Quick and dirty SPA to show the value of a given stock.

Uses terraform to spin up an AWS EC2 instance with a simple security group and retrieve the Dockerfile via ECR.


Here you can see a quick overview of your portfolio

![Home](https://user-images.githubusercontent.com/42459707/142715229-edc80948-4c70-4019-a238-d42d0d5581b1.PNG)

If you refresh too much (5 times in one minute) You will receive this error. It will restore after 1 more minute

![Error](https://user-images.githubusercontent.com/42459707/142715233-be0221ba-e6f7-4bd7-b0fa-6f1e25fd68ce.PNG)

When you initially load the app you will see 1. When you change this value it is saved to local storage

![Storage](https://user-images.githubusercontent.com/42459707/142715274-9ea736a9-6a05-487e-a8b8-05f221483f23.PNG)
