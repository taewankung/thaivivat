Requirement:
---
* mysql 5.7
* ts-node
* typeorm-cli
* babel

Install:
---
```
yarn install
docker pull mysql
```

enviroment:
---
* DATABASE_URL={main database url example: mysql://root:@127.0.0.1:7777/ParkingIOT }
* TEST_DATABASE_URL={test database url example: mysql://root:@127.0.0.1:7777/testParkingIOT }
* port={port to run server}

RunServer:
---
```
yarn migrate
yarn start
```

use Docker:
---
```
docker build . -t interview_iot
docker-compose up -d
```

TEST: 
---
```
jest --runInBand
```

Post method:
---
* 1: It should provide us with api to create parking lot
```
api/create/parkingIot
body: {
    name: "No.1",
    mac: "888"
}
```
* 2 It should provide us with api to park the car
```
/parked
body: {
    name: "No.1",
}
```
* 3 It should provide us with api to leave the slot
```
api/leaved
body: {
    name: "No.1",
}
```
* 7 If you have any idea to complete the api, feel free to add more

create slot
```
api/create/slot
body: {
    parkingIotId: 1,
    slotName: "slot No.1",
    size: "medium"
}
```
create ticket
```
api/create/ticket
body: {
    plateNumber: "152687",
    size: "medium"
}
```
GET method:
-----------------
* 4 It should provide us with api to get status of parking lot
```
api/status/:name
params:{
    name: "No.1"
}
```

* 5 It should provide us with api to get registration plate number list by car size
```
api/registration/plateNumberList/:carSize
params:{
    carSize: "medium"
}
```

* 6 It should provide us with api to get registration allocated slot number list by car size
```
api/registration/allocated/:carSize/plateNumberList/:carSize
params:{
    carSize: "medium"
}
```

