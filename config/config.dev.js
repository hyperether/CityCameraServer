var config = {
  security: {
    secret: 'SOME_RANDOM_STRING'
  },
  "mongodb": {
    "host": "mongodb://localhost:27017/",
    "db": "citycamera_dev"
  },
  "file": {
    "destination": "./upload"
  },
  "log": {
    "level": "debug",
    "json": false,
    "logsToFile": true,
    "fileLogParams": {
      "folder": "log",
      "prefix": "city_camera_",
      "datePattern": "yyyy_MM_dd",
      "extension": "log",
      "keepLogsDays": 5
    }
  },
  "provider": "s3",
  "serverURL": "http://localhost:3000"
};


module.exports = config;
