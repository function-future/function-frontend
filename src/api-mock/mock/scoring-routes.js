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
