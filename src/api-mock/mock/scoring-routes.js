export const assignments = [
  {
    method: 'GET',
    url: '/api/scoring/batches/future1/assignments?page=1&size=10',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
        {
          "id": "ASG0001",
          "title": "Assignment 1",
          "description": "Description Number 1",
          "deadline": 15000000,
          "batchCode": "future1",
          "uploadedDate": 15000000000,
          "file": "",
          "fileId": ""
        },
        {
          "id": "ASG0002",
          "title": "Assignment 2",
          "description": "Description Number 2",
          "deadline": 30000000,
          "batchCode": "future1",
          "uploadedDate": 30000000000,
          "file": "",
          "fileId": ""
        },
        {
          "id": "ASG0003",
          "title": "Assignment 3",
          "description": "Description Number 3",
          "deadline": 60000000,
          "batchCode": "future1",
          "uploadedDate": 60000000000,
          "file": "",
          "fileId": ""
        },
        {
          "id": "ASG0004",
          "title": "Assignment 4",
          "description": "Description Number 4",
          "deadline": 90000000,
          "batchCode": "future1",
          "uploadedDate": 90000000000,
          "file": "",
          "fileId": ""
        }
      ],
      "paging": {
        "page": 1,
        "size": 10,
        "totalRecords": 13
      }
    }
  },
  {
    method: 'POST',
    url: '/api/scoring/batches/future1/assignments',
    response: {
      "code": 201,
      "status": "CREATED",
      "data": {
        "id": "ASG0001",
        "title": "Assignment 1",
        "description": "Description Number 1",
        "deadline": 1500000000,
        "file": "function-static.com/fileName.docx",
        "fileId": "",
        "batchCode": "future1",
        "uploadedDate": 60000000000
      }
    }
  },
  {
    method: 'POST',
    url: '/api/scoring/batches/future1/assignments/copy',
    response: {
      "code": 201,
      "status": "CREATED",
      "data": {
        "id": "ASG0001",
        "title": "Assignment 1",
        "description": "Description Number 1",
        "deadline": 1500000000,
        "file": "function-static.com/fileName.docx",
        "fileId": "",
        "batchCode": "future1",
        "uploadedDate": 60000000000
      }
    }
  }
]

export const assignmentDetails = [
  {
    method: 'GET',
    url: '/api/scoring/batches/future1/assignments/ASG0001',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "ASG0001",
        "title": "Assignment 1",
        "description": "Description Number 1",
        "deadline": 15000000,
        "file": "http://function-static.com/ASG0001/fileName.docx",
        "fileId": "",
        "batchCode": "future1",
        "uploadedDate": 60000000000
      }
    }
  },
  {
    method: 'PUT',
    urL: '/api/scoring/batches/future1/assignments/ASG0001',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "ASG0001",
        "title": "Assignment 1",
        "description": "Description Number 1",
        "deadline": 15000000,
        "file": "http://function-static.com/ASG0001/fileName.docx",
        "fileId": "",
        "batchCode": "future1",
        "uploadedDate": 60000000000
      }
    }
  },
  {
    method: 'DELETE',
    url: '/api/scoring/batches/1/assignments/ASG0001',
    response:
      {
        "code": 200,
        "status": "OK"
      }
  }
]

export const assignmentRooms = [
  {
    method: 'GET',
    url: '/api/scoring/batches/future1/judgings/students?page=1&size=10',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
        {
          "id": "sample-id",
          "role": "STUDENT",
          "email": "user@user.com",
          "name": "John Doe",
          "phone": "088888888888",
          "address": "Jl. Address 1 Address 2",
          "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "avatarId": "",
          "batch": {
            "id": "sample-id",
            "name": "Batch Name",
            "code": "3"
          },
          "university": "Bina Nusantara University",
          "finalPoint": 100
        },
        {
          "id": "sample-id-2",
          "role": "STUDENT",
          "email": "user2@user.com",
          "name": "Jane Doe",
          "phone": "088888888888",
          "address": "Jl. Address 1 Address 2",
          "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "avatarId": "",
          "batch": {
            "id": "future1",
            "name": "Batch Name",
            "code": "3"
          },
          "university": "Bina Nusantara University",
          "finalPoint": 100
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
    url: 'api/scoring/batches/future1/assignments/ASG0001/room/sample-id',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "assignment": {
          "id": "ASG0001",
          "title": "Assignment 1",
          "description": "Description Number 1",
          "deadline": 15000000,
          "file": "http://function-static.com/ASG0001/fileName.docx",
          "fileId": "",
          "batchCode": "future1",
          "uploadedDate": 60000000000
        },
        "id": "ROM0001",
        "point": 100,
        "student": {
          "id": "sample-id",
          "role": "STUDENT",
          "email": "user@user.com",
          "name": "User Name",
          "phone": "088888888888",
          "address": "Jl. Address 1 Address 2",
          "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "avatarId": "",
          "batch": {
            "id": "future1",
            "name": "Batch Name",
            "code": "3"
          },
          "university": "Bina Nusantara University",
          "finalPoint": 100
        },
      }
    }
  },
  {
    method: 'PUT',
    url: 'api/scoring/batches/future1/assignments/ASG0001/room/sample-id',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "assignment": {
          "id": "ASG0001",
          "title": "Assignment 1",
          "description": "Description Number 1",
          "deadline": 15000000,
          "file": "http://function-static.com/ASG0001/fileName.docx",
          "fileId": "",
          "batchCode": "future1",
          "uploadedDate": 60000000000
        },
        "id": "ROM0001",
        "point": 300,
        "student": {
          "id": "sample-id",
          "role": "STUDENT",
          "email": "user@user.com",
          "name": "User Name",
          "phone": "088888888888",
          "address": "Jl. Address 1 Address 2",
          "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "avatarId": "",
          "batch": {
            "code": "future1",
            "id": "3",
            "name": "Batch Name"
          },
          "university": "Bina Nusantara University",
          "finalPoint": 100
        }
      }
    }
  },
  {
    method: 'DELETE',
    url: 'api/scoring/batches/future1/assignments/ASG0001/room/sample-id',
    response: {
      "code": 200,
      "status": "OK"
    }
  }
]

export const assignmentRoomComment = [
  {
    method: 'GET',
    url: '/api/scoring/batches/future1/assignments/ASG0001/rooms/sample-id/comments?page=1&size=4',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
        {
          "id": "CMT00001",
          "author": {
            "id": "USR00001",
            "name": "User 1"
          },
          "comment": "Comment Example 1",
          "createdAt": 1500000000
        },
        {
          "id": "CMT00002",
          "author": {
            "id": "USR00001",
            "name": "User 1"
          },
          "comment": "Comment Example 2",
          "createdAt": 1500000000
        }
      ],
      "paging": {
        "page": 1,
        "size": 4,
        "totalRecords": 12
      }
    }
  },
  {
    method: 'GET',
    url: '/api/scoring/batches/future1/assignments/ASG0001/rooms/sample-id/comments?page=2&size=4',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
        {
          "id": "CMT00003",
          "author": {
            "id": "USR00001",
            "name": "User 1"
          },
          "comment": "Comment Example 3",
          "createdAt": 1500000000
        },
        {
          "id": "CMT00004",
          "author": {
            "id": "USR00001",
            "name": "User 1"
          },
          "comment": "Comment Example 4",
          "createdAt": 1500000000
        }
      ],
      "paging": {
        "page": 2,
        "size": 4,
        "totalRecords": 12
      }
    }
  },
  {
    method: 'GET',
    url: '/api/scoring/batches/future1/assignments/ASG0001/rooms/sample-id/comments?page=3&size=4',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
        {
          "id": "CMT00005",
          "author": {
            "id": "USR00001",
            "name": "User 1"
          },
          "comment": "Comment Example 5",
          "createdAt": 1500000000
        },
        {
          "id": "CMT00006",
          "author": {
            "id": "USR00001",
            "name": "User 1"
          },
          "comment": "Comment Example 6",
          "createdAt": 1500000000
        }
      ],
      "paging": {
        "page": 3,
        "size": 4,
        "totalRecords": 12
      }
    }
  },
  {
    method: 'GET',
    url: '/api/scoring/batches/future1/assignments/ASG0001/rooms/sample-id/comments?page=4&size=4',
    response: {
      "code": 200,
      "status": "OK",
      "data": [],
      "paging": {
        "page": 4,
        "size": 4,
        "totalRecords": 12
      }
    }
  },
  {
    method: 'POST',
    url: '/api/scoring/batches/future1/assignments/ASG0001/rooms/sample-id/comments',
    response: {
      "code": 201,
      "status": "CREATED",
      "data": {
        "id": "CMT00002",
        "author": {
          "id": "USR00001",
          "name": "User 1"
        },
        "comment": "Comment Example 2",
        "createdAt": 1500000000
      }
    }
  }
]

export const quizzes = [
  {
    method: 'GET',
    url: '/api/scoring/batches/1/quizzes?page=1&size=10',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
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
        ],
      "paging": {
        "page": 1,
        "size": 10,
        "totalRecords": 13
      }
    }
  },
  {
    method: 'POST',
    url: '/api/scoring/batches/1/quizzes',
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
  },
  {
    method: 'POST',
    url: '/api/scoring/batches/sample-id-3/quizzes/copy',
    response: {
      "code": 201,
      "status": "CREATED",
      "data": {
        "id": "QZ0001",
        "title": "Quiz 1",
        "description": "Description Number 1",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 5,
        "questionBankId": [
          "QNK0001"
        ],
        "questionCount": 10,
        "batchCode": "3"
      }
    }
  }
]

export const quizDetail = [
  {
    method: 'GET',
    url: '/api/scoring/batches/1/quizzes/QZ00001',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "QZ00001",
        "title": "Quiz Title 1",
        "description": "Description Number 1",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 1
      }
    }
  },
  {
    method: 'PUT',
    url: '/api/scoring/batches/1/quizzes/QZ00001',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "QZ0001",
        "title": "Quiz 1",
        "description": "Description Number 1",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 6000,
        "trials": 2,
        "questionBankId": [
          "QNK0002"
        ],
        "questions": 15
      }
    }
  },
  {
    method: 'DELETE',
    url: '/api/scoring/batches/1/quizzes/QZ00001',
    response: {
      "code": 200,
      "status": "OK"
    }
  }
]

export const studentQuiz = [
  {
    method: 'GET',
    url: '/api/scoring/students/sample-id/quizzes?page=1&size=10',
    response: {
      "code": 200,
      "status": "OK",
      "paging": {
        "page": 1,
        "size": 12,
        "totalRecords": 13
      },
      "data": [
        {
          "id": "sample-id",
          "quiz": {
            "id": "QZ0001",
            "title": "Quiz 2",
            "description": "Description for Quiz 2",
            "startDate": 15000000,
            "endDate": 15000000,
            "timeLimit": 3600,
            "trials": 3,
            "questionCount": 10,
            "questionBanks": [
              "QNK00001"
            ],
            "batchCode": "3"
          }
        },
        {
          "id": "sample-id",
          "quiz": {
            "id": "QZ0001",
            "title": "Quiz 2",
            "description": "Description for Quiz 2",
            "startDate": 15000000,
            "endDate": 15000000,
            "timeLimit": 3600,
            "trials": 3,
            "questionCount": 10,
            "questionBanks": [
              "QNK00001"
            ],
            "batchCode": "3"
          }
        }
      ]
    }
  }
]

export const studentQuizDetail = [
  {
    method: 'GET',
    url: '/api/scoring/students/sample-id/quizzes/QZ0001',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "sample-id",
        "quiz": {
          "id": "QZ0001",
          "title": "Quiz 2",
          "description": "Description for Quiz 2",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batchCode": "3"
        }
      }
    }
  }
]

export const studentQuizQuestion = [
  {
    method: 'GET',
    url: '/api/scoring/students/sample-id/quizzes/QZ00001/questions',
    response: {
      "code" : 200,
      "status" : "OK",
      "data" : {
        "questions": [
          {
            "number" : 1,
            "text" : "Question Example 1",
            "options" : [
              {
                "optionId" : "OptionId1",
                "label" : "Answer Example 1"
              },
              {
                "optionId" : "OptionId2",
                "label" : "Answer Example 2"
              },
              {
                "optionId" : "OptionId3",
                "label" : "Answer Example 3"
              },
              {
                "optionId" : "OptionId4",
                "label" : "Answer Example 4"
              }
            ]
          },
          {
            "number" : 2,
            "text" : "Question Example 2",
            "options" : [
              {
                "optionId" : "OptionId1",
                "label" : "Answer Example 5"
              },
              {
                "optionId" : "OptionId2",
                "label" : "Answer Example 6"
              },
              {
                "optionId" : "OptionId3",
                "label" : "Answer Example 7"
              },
              {
                "optionId" : "OptionId4",
                "label" : "Answer Example 8"
              }
            ]
          },
        ]
      }
    }
  },
  {
    method: 'POST',
    url: '/api/scoring/students/sample-id/quizzes/QZ00001/questions',
    response:
      {
        "code": 201,
        "status": "CREATED",
        "data": {
          "point": 100
        }
      }
  }
]

export const questionBanks = [
  {
    method: 'GET',
    url: '/api/scoring/question-banks?page=1&size=10',
    response: {
      "code" : 200,
      "status" : "OK",
      "data" : [
        {
          "id" : "QNK0001",
          "title" : "Question Bank 1",
          "description" : "Question Bank Number 1"
        },
        {
          "id" : "QNK0002",
          "title" : "Question Bank 2",
          "description" : "Question Bank Number 2"
        },
        {
          "id" : "QNK0003",
          "title" : "Question Bank 3",
          "description" : "Question Bank Number 3"
        },
        {
          "id" : "QNK0004",
          "title" : "Question Bank 4",
          "description" : "Question Bank Number 4"
        },
        {
          "id" : "QNK0005",
          "title" : "Question Bank 5",
          "description" : "Question Bank Number 5"
        }
      ],
      "paging" : {
        "page" : 1,
        "size" : 10,
        "totalRecords" : 13
      }
    }
  },
  {
    method: 'POST',
    url: '/api/scoring/question-banks',
    response: {
      "code": 201,
      "status": "CREATED",
      "data": {
        "id": "QNK0001",
        "title": "Question Bank #2",
        "description": "Question Bank Number 2"
      }
    }
  }
]

export const questionBankDetail = [
  {
    method: 'GET',
    url: '/api/scoring/question-banks/QNK0001',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "QNK0001",
        "title": "Question Bank #2",
        "description": "Question Bank Number 2"
      }
    }
  },
  {
    method: 'PUT',
    url: '/api/scoring/question-banks/QNK0001',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "QNK0001",
        "title": "Question Bank #2",
        "description": "Question Bank Number 2"
      }
    }
  },
  {
    method: 'DELETE',
    url: '/api/scoring/question-banks/QNK0001',
    response: {
      "code": 200,
      "status": "OK"
    }
  }
]

export const questionBankQuestions = [
  {
    method: 'GET',
    url: '/api/scoring/question-banks/QNK0001/questions',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
        {
          "id": "QST0001",
          "label": "Question Sample 1",
          "options": [
            {
              "id": "OPT0001",
              "label": "Answer Sample 1-1"
            },
            {
              "id": "OPT0002",
              "label": "Answer Sample 1-2"
            },
            {
              "id": "OPT0003",
              "label": "Answer Sample 1-3"
            },
            {
              "id": "OPT0004",
              "label": "Answer Sample 1-4",
              "correct": true
            }
          ]
        }
      ],
      "paging": {
        "page": 1,
        "size": 10,
        "totalRecords": 13
      }
    }
  },
  {
    method: 'POST',
    url: '/api/scoring/question-banks/QNK0001/questions',
    response: {
      "code": 201,
      "status": "CREATED",
      "data": {
        "id": "QST0001",
        "text": "Question Sample 1",
        "options": [
          {
            "id": "OPT0001",
            "label": "Answer Sample 1-1"
          },
          {
            "id": "OPT0002",
            "label": "Answer Sample 1-2"
          },
          {
            "id": "OPT0003",
            "label": "Answer Sample 1-3",
            "correct": true
          },
          {
            "id": "OPT0004",
            "label": "Answer Sample 1-4"
          }
        ]
      }
    }
  }
]

export const questionBankQuestionDetail = [
  {
    method: 'GET',
    url: '/api/scoring/question-banks/QNK0001/questions/QST0001',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "QST0001",
        "label": "Question Example 1",
        "options": [
          {
            "id": "OPT0001",
            "label": "Answer Example 1-1"
          },
          {
            "id": "OPT0002",
            "label": "Answer Example 1-2"
          },
          {
            "id": "OPT0003",
            "label": "Answer Example 1-3",
            "correct": true
          },
          {
            "id": "OPT0004",
            "label": "Answer Example 1-4"
          }
        ]
      }
    }
  },
  {
    method: 'PUT',
    url: '/api/scoring/question-banks/QNK0001/questions/QST0001',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "QST0001",
        "questionText": "Question Example 1",
        "options": [
          {
            "id": "OPT0001",
            "optionText": "Answer Example 1-1",
            "correct": false
          },
          {
            "id": "OPT0002",
            "optionText": "Answer Example 1-2",
            "correct": false
          },
          {
            "id": "OPT0003",
            "optionText": "Answer Example 1-3",
            "correct": true
          },
          {
            "id": "OPT0004",
            "optionText": "Answer Example 1-4",
            "correct": false
          }
        ]
      }
    }
  },
  {
    method: 'DELETE',
    url: '/api/scoring/question-banks/QNK0001/questions/QST0001',
    response: {
      "code": 200,
      "status": "OK"
    }
  }
]

export const points = [
  {
    method: 'GET',
    url: '/api/scoring/summary/5d1db5dcc299ea1fc8596234',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "studentName": "Student 1",
        "batchCode": "3",
        "university": "University 1",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "scores": [
          {
            "id": "QZ0001",
            "title": "Quiz 1",
            "type": "QUIZ",
            "point": 80
          },
          {
            "id": "QZ0002",
            "title": "Quiz 2",
            "type": "QUIZ",
            "point": 100
          },
          {
            "id": "QZ0003",
            "title": "Quiz 3",
            "type": "QUIZ",
            "point": 70
          },
          {
            "id": "ASG0001",
            "title": "Assignment 1",
            "type": "ASSIGNMENT",
            "point": 80
          },
          {
            "id": "ASG0002",
            "title": "Assignment 2",
            "type": "ASSIGNMENT",
            "point": 30
          },
          {
            "id": "ASG0003",
            "title": "Assignment 3",
            "type": "ASSIGNMENT",
            "point": 100
          }
        ]
      }
    }
  }
]

export const finalJudging = [
  {
    method: 'GET',
    url: '/api/scoring/judgings?page=1&size=10',
    response: {
      "code" : 200,
      "status" : "OK",
      "data" : [
        {
          "id" : "FNC0001",
          "title" : "Final Comparison #1",
          "description" : "Final Comparison of Students",
          "studentCount" : 4,
          "uploadedDate" : 15000000000,
          "usedAt" : 15000000000
        },
        {
          "id" : "FNC0002",
          "title" : "Final Comparison #2",
          "description" : "Final Comparison of Students",
          "studentCount" : 3,
          "uploadedDate" : 15000000000,
          "usedAt" : 15000000000
        }
      ],
      "paging": {
        "page": 1,
        "size": 10,
        "totalRecords": 13
      }
    }
  },
  {
    method: 'POST',
    url: '/api/scoring/batches/1/judgings',
    response:
      {
        "code": 201,
        "status": "CREATED",
        "data": {
          "id": "FNC0001",
          "name": "Final Comparison #1",
          "description": "Final Comparison Decription #1",
          "batchCode": "3",
          "studentCount": 3,
          "uploadedDate": 15000000000,
          "students": [
            {
              "studentId": "student-id",
              "studentName": "Student",
              "university": "University",
              "avatar": "http://localhost:8080/avatar.png",
              "batchCode": "3"
            },
            {
              "studentId": "student-id-2",
              "studentName": "Student 2",
              "university": "University",
              "avatar": "http://localhost:8080/avatar-2.png",
              "batchCode": "3"
            }
          ]
        }
      }
  }
]

export const finalJudgingDetail = [
  {
    method: 'GET',
    url: '/api/scoring/batches/1/judgings/FNC0001',
    response:
      {
        "code": 200,
        "status": "OK",
        "data": {
          "id": "FNC0001",
          "name": "Final Comparison 1",
          "description": "Final Comparison of Students",
          "batchCode": "3",
          "uploadedDate": 15000000000,
          "studentCount": 3,
          "students": [
            {
              'id': 'sample-id-student',
              'role': 'STUDENT',
              'email': 'user@user.com',
              'name': 'User Student 1',
              'phone': '088888888888',
              'address': 'Jl. Address 1 Address 2',
              'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
              'batch': {
                'id': 'sample-id',
                'name': 'Batch Name',
                'code': '3'
              },
              'university': 'Bina Nusantara University'
            },
            {
              'id': 'sample-id-2',
              'role': 'STUDENT',
              'email': 'user@user.com',
              'name': 'User Student 2',
              'phone': '088888888888',
              'address': 'Jl. Address 1 Address 2',
              'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
              'batch': {
                'id': 'sample-id',
                'name': 'Batch Name',
                'code': '3'
              },
              'university': 'Bina Nusantara University'
            }
          ]
        }
      }
  },
  {
    method: 'PUT',
    url: '/api/scoring/batches/1/judgings/FNC0001',
    response:
      {
        "code": 200,
        "status": "OK",
        "data": {
          "id": "FNC0001",
          "title": "Final Comparison 1",
          "description": "Final Comparison of Students",
          "usedAt": 150000000,
          "batchCode": "3",
          "studentIds": [
            "USR0001",
            "USR0002",
            "USR0003"
          ],
          "studentCount": 3
        }
      }
  },
  {
    method: 'DELETE',
    url: '/api/scoring/batches/1/judgings/FNC0001',
    response: {
      "code": 200,
      "status": "OK"
    }
  }
]

export const finalJudgingComparisons = [
  {
    method: 'GET',
    url: '/api/scoring/batches/1/final-judgings/FNC0001/comparison',
    response: {
      "code": 200,
      "status": "OK",
      "data" : [
        {
          "studentId": "student-id-1",
          "studentName" : "Student 1",
          "batchCode" : "1",
          "university": "Binus University",
          "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "point": 100,
          "scores" : [
            {
              "title" : "Quiz #1",
              "type": "QUIZ",
              "point" : 100
            },
            {
              "title" : "Quiz #2",
              "type": "QUIZ",
              "point" : 80
            },
            {
              "title" : "Assignment #1",
              "type": "ASSIGNMENT",
              "point" : 80
            },
            {
              "title" : "Quiz #1",
              "type": "QUIZ",
              "point" : 100
            },
            {
              "title" : "Quiz #2",
              "type": "QUIZ",
              "point" : 80
            },
            {
              "title" : "Assignment #1",
              "type": "ASSIGNMENT",
              "point" : 80
            }
          ]
        },
        {
          "studentId": "student-id-2",
          "studentName" : "Student 2",
          "batchCode" : "1",
          "university": "Binus University",
          "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "point": 100,
          "scores" : [
            {
              "title" : "Quiz #1",
              "type": "QUIZ",
              "point" : 100
            },
            {
              "title" : "Quiz #2",
              "type": "QUIZ",
              "point" : 80
            },
            {
              "title" : "Assignment #1",
              "type": "ASSIGNMENT",
              "point" : 80
            }
          ]
        }
      ]
    }
  },
  {
    method: 'POST',
    url: '/api/scoring/batches/1/final-judgings/FNC0001/comparison',
    response: {
      "code": 201,
      "status": "CREATED",
      "data": [
        {
          "studentId": "SDT0001",
          "score": 90
        },
        {
          "studentId": "SDT0002",
          "score": 80
        },
        {
          "studentId": "SDT0003",
          "score": 70
        }
      ]
    }
  }
]
