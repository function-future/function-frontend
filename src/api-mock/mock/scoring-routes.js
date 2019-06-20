export const assignments = [
  {
    method: 'GET',
    url: '/api/scoring/batches/futur3/assignments?page=0&size=10',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
        {
          "id": "ASG0001",
          "title": "Assignment 1",
          "description": "Description Number 1",
          "deadline": 15000000,
          "batch": 3,
          "uploadedDate": 15000000000
        },
        {
          "id": "ASG0002",
          "title": "Assignment 2",
          "description": "Description Number 2",
          "deadline": 30000000,
          "batch": 3,
          "uploadedDate": 30000000000
        },
        {
          "id": "ASG0003",
          "title": "Assignment 3",
          "description": "Description Number 3",
          "deadline": 60000000,
          "batch": 3,
          "uploadedDate": 60000000000
        },
        {
          "id": "ASG0004",
          "title": "Assignment 4",
          "description": "Description Number 4",
          "deadline": 90000000,
          "batch": 3,
          "uploadedDate": 90000000000
        }
      ],
      "paging": {
        "page": 1,
        "size": 12,
        "totalRecords": 13
      }
    }
  },
  {
    method: 'POST',
    url: '/api/scoring/batches/futur3/assignments?page=0&size=10',
    response: {
      "code": 201,
      "status": "CREATED",
      "data": {
        "id": "ASG0001",
        "title": "Assignment 1",
        "description": "Description Number 1",
        "deadline": 1500000000,
        "file": "function-static.com/fileName.docx",
        "batch": 3
      }
    }
  }
]

export const assignmentDetails = [
  {
    method: 'GET',
    url: '/api/scoring/batches/3/assignments/ASG0001',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "ASG0001",
        "title": "Assignment 1",
        "description": "Description Number 1",
        "deadline": 15000000,
        "file": "http://function-static.com/ASG0001/fileName.docx",
        "batch": 3
      }
    }
  },
  {
    method: 'PUT',
    urL: '/api/scoring/batches/3/assignments/ASG0001',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "ASG0001",
        "title": "Assignment 1",
        "description": "Description Number 1",
        "deadline": 15000000,
        "file": "http://function-static.com/ASG0001/fileName.docx",
        "batch": 3
      }
    }
  }
]

export const assignmentRooms = [
  {
    method: 'GET',
    url: '/api/scoring/batches/3/assignments/ASG0001/rooms?page=1&size=10',
    response: {
      "code": 200,
      "status": "OK",
      "data": [ // TODO Update API spec
        {
          "id": "ROM0001",
          "point": 80,
          "student": {
            "id": "sample-id",
            "role": "STUDENT",
            "email": "user@user.com",
            "name": "John Doe",
            "phone": "088888888888",
            "address": "Jl. Address 1 Address 2",
            "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            "batch": {
              "id": "sample-id",
              "name": "Batch Name",
              "code": "3"
            },
            "university": "Bina Nusantara University"
          },
          "assignment": {
            "id": "ASG0001",
            "title": "Assignment 1",
            "description": "Description Number 1",
            "deadline": 15000000,
            "file": "http://function-static.com/ASG0001/fileName.docx",
            "batch": 3
          }
        },
        {
          "id": "ROM0002",
          "point": 90,
          "student": {
            "id": "sample-id-2",
            "role": "STUDENT",
            "email": "user2@user.com",
            "name": "Jane Doe",
            "phone": "088888888888",
            "address": "Jl. Address 1 Address 2",
            "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            "batch": {
              "id": "sample-id",
              "name": "Batch Name",
              "code": "3"
            },
            "university": "Bina Nusantara University"
          },
          "assignment": {
            "id": "ASG0001",
            "title": "Assignment 1",
            "description": "Description Number 1",
            "deadline": 15000000,
            "file": "http://function-static.com/ASG0001/fileName.docx",
            "batch": 3
          }
        }
      ],
      "paging": {
        "page": 1,
        "size": 12,
        "totalRecords": 13
      }
    }
  },
  {
    method: 'GET',
    url: 'api/scoring/batches/3/assignments/ASG0001/rooms/ROM0001',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "ROM0001",
        "student": {
          "id": "sample-id",
          "role": "STUDENT",
          "email": "user@user.com",
          "name": "User Name",
          "phone": "088888888888",
          "address": "Jl. Address 1 Address 2",
          "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "batch": {
            "id": "sample-id",
            "name": "Batch Name",
            "code": "3"
          },
          "university": "Bina Nusantara University"
        },
        "point": 100,
        "assignment": {
          "id": "ASG0001",
          "title": "Assignment 1",
          "description": "Description Number 1",
          "deadline": 15000000,
          "file": "http://function-static.com/ASG0001/fileName.docx",
          "batch": 3
        }
      }
    }
  }
]

export const quizzes = [
  {
    method: 'GET',
    url: '/api/scoring/batches/futur3/quizzes?page=0&size=10',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "quizzes": [
          {
            "id": "QZ00001",
            "title": "Quiz Number 1",
            "description": "Description Number 1",
            "startDate": 15000000,
            "endDate": 15000000,
            "timeLimit": 3600,
            "trials": 3,
            "questionCount": 10,
            "questionBanks": [
              "QNK00001"
            ],
            "batch": 3
          },
          {
            "id": "QZ00002",
            "title": "Quiz Number 2",
            "description": "Description Number 2",
            "startDate": 15000000,
            "endDate": 15000000,
            "timeLimit": 3600,
            "trials": 3,
            "questionCount": 10,
            "questionBanks": [
              "QNK00001"
            ],
            "batch": 3
          },
          {
            "id": "QZ00003",
            "title": "Quiz Number 3",
            "description": "Description Number 3",
            "startDate": 15000000,
            "endDate": 15000000,
            "timeLimit": 3600,
            "trials": 3,
            "questionCount": 10,
            "questionBanks": [
              "QNK00001"
            ],
            "batch": 3
          },
          {
            "id": "QZ00004",
            "title": "Quiz Number 4",
            "description": "Description Number 4",
            "startDate": 15000000,
            "endDate": 15000000,
            "timeLimit": 3600,
            "trials": 3,
            "questionCount": 10,
            "questionBanks": [
              "QNK00001"
            ],
            "batch": 3
          }
        ]
      },
      "paging": {
        "page": 1,
        "size": 12,
        "totalRecords": 13
      }
    }
  },
  {
    method: 'POST',
    url: '/api/scoring/batches/batchCode/quizzes?page=0&size=10',
    response: {
      "code": 201,
      "status": "CREATED",
      "data": {
        "id": "QZ00002",
        "title": "Quiz 1",
        "description": "Description Number 1",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 5,
        "questionBankId": [
          "QNK0001"
        ],
        "questions": 10
      }
    }
  }
]
