ทำตัว migration

npm install -g ts-node

mysql version.8
ถ้าใช้ default ของโปรแกรม
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

docker build . -t interview_iot
docker run --name interview_iot npm run start
