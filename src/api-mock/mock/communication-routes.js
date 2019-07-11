import config from '../../config/index'

export const chatrooms = [
  {
    // get all private chatrooms
    method: 'GET',
    url: config.api.communication.chatrooms.list('PRIVATE', '', 1, 10 ),
    response: {
      'code' : 200,
      'status' : 'OK',
      'data' : [
        {
          'id' : '63dc9f59-a579-4b69-a80c-a3aa8d794f16',
          'name' : null,
          'participants' : [
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e6507563f0',
              'name' : 'Priagung Satyagama',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            },
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e650756333',
              'name' : 'Ricky Kennedy',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            }
          ],
          'type' : 'PRIVATE',
          'lastMessage' : {
            'message' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet sollicitudin justo',
            'time' : 1561500940093,
            'isSeen' : false
          }
        },
        {
          'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f16',
          'name' : null,
          'participants' : [
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e6507563f0',
              'name' : 'Priagung Satyagama',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            },
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e650756311',
              'name' : 'Jonathan',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            }
          ],
          'type' : 'PRIVATE',
          'lastMessage' : {
            'message' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet sollicitudin justo',
            'time' : 1561300940093,
            'isSeen' : false
          }
        },
      ],
      'paging' : {
        'page' : 1,
        'size' : 10,
        'totalRecords' : 2
      }
    }
  },
  {
    //get all group chatrooms
    method: 'GET',
    url: config.api.communication.chatrooms.list('GROUP', '', 1, 10 ),
    response: {
      'code' : 200,
      'status' : 'OK',
      'data' : [
        {
          'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f22',
          'name' : 'Tim Future Bandung',
          'participants' : [
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e650756333',
              'name' : 'Ricky Kennedy',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            },
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e6507563f0',
              'name' : 'Priagung Satyagama',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            },
            {
              'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f13',
              'name' : 'Felix Wimpy W',
              'avatar' : 'https://dummyimage.com/600x400/000/ff0'
            }
          ],
          'type' : 'GROUP',
          'lastMessage' : {
            'message' : 'Ini Last Message',
            'time' : 1561500940093,
            'isSeen' : false
          }
        },
        {
          'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f16',
          'name' : 'Grup Jon',
          'participants' : [
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e650756333',
              'name' : 'Ricky Kennedy',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            },
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e6507563f0',
              'name' : 'Priagung Satyagama',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            },
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e650756311',
              'name' : 'Jonathan',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            }
          ],
          'type' : 'GROUP',
          'lastMessage' : {
            'message' : 'Selamat siang semuanya',
            'time' : 1561500940093,
            'isSeen' : false
          }
        },
      ],
      'paging' : {
        'page' : 1,
        'size' : 10,
        'totalRecords' : 2
      }
    }
  },
  {
    //search chatrooms by name
    method: 'GET',
    url: config.api.communication.chatrooms.list('', 'jon', 1, 10 ),
    response: {
      'code' : 200,
      'status' : 'OK',
      'data' : [
        {
          'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f16',
          'name' : 'Grup Jon',
          'participants' : [
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e650756333',
              'name' : 'Ricky Kennedy',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            },
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e6507563f0',
              'name' : 'Priagung Satyagama',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            },
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e650756311',
              'name' : 'Jonathan',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            }
          ],
          'type' : 'GROUP',
          'lastMessage' : {
            'message' : 'Selamat siang semuanya',
            'time' : 1561500940093,
            'isSeen' : false
          }
        },
        {
          'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f16',
          'name' : null,
          'participants' : [
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e6507563f0',
              'name' : 'Priagung Satyagama',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            },
            {
              'id' : '5f4d2dfd-6532-44b8-8a9e-34e650756311',
              'name' : 'Jonathan',
              'avatar' : 'https://dummyimage.com/600x400/000/fff'
            }
          ],
          'type' : 'PRIVATE',
          'lastMessage' : {
            'message' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet sollicitudin justo',
            'time' : 1561500940093,
            'isSeen' : true
          }
        }
      ],
      'paging' : {
        'page' : 1,
        'size' : 10,
        'totalRecords' : 2
      }
    }
  },
  {
    //get chatroom details
    method: 'GET',
    url: config.api.communication.chatrooms.getDetails('63dc9f59-a579-4b69-a80c-a3c48d794f16'),
    response: {
      'code' : 200,
      'status' : 'OK',
      'data' : {
        'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f22',
        'name' : 'Tim Future Bandung',
        'members' : [
          {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f16',
            'name' : 'Priagung Satyagama',
            'avatar' : 'https://dummyimage.com/600x400/000/ff0',
            'university' : 'Institut Teknologi Bandung',
            'batch': {
              'id': 'sample-id',
              'name': 'Batch Name',
              'code': '3'
            },
            'type' : 'STUDENT'
          },
          {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f14',
            'name' : 'Ricky Kennedy',
            'avatar' : 'https://dummyimage.com/600x400/000/ff0',
            'university' : 'Institut Teknologi Bandung',
            'batch': {
              'id': 'sample-id',
              'name': 'Batch Name',
              'code': '3'
            },
            'type' : 'STUDENT'
          },
          {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f13',
            'name' : 'Felix Wimpy W',
            'avatar' : 'https://dummyimage.com/600x400/000/ff0',
            'university' : null,
            'batch' : null,
            'type' : 'MENTOR'
          }
        ]
      }
    }
  },
  {
    //get messages in a chatroom
    method: 'GET',
    url: config.api.communication.chatrooms.getMessages('63dc9f59-a579-4b69-a80c-a3c48d794f22', 1, 10),
    response: {
      'code' : 200,
      'status' : 'OK',
      'data' : [
        {
          'id': '63dc9f59-a579-4b69-a80c-a3c48d794f46',
          'sender' : {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f16',
            'name' : 'Priagung Satyagama',
            'avatar' : 'https://dummyimage.com/600x400/000/fff'
          },
          'text' : 'Lorem ipsum dolor sit amet, consectetur adipiscing last message',
          'time' : 1561500940093,
        },
        {
          'id': '63dc9f59-a579-4b69-a80c-a3c48d794f26',
          'sender' : {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d733f16',
            'name' : 'Ricky Kennedy',
            'avatar' : 'https://dummyimage.com/600x400/000/ff0'
          },
          'text' : 'consectetur adipiscing',
          'time' : 1561500740093,
        }
      ],
      'paging' : {
        'page' : 1,
        'size' : 12,
        'totalRecords' : 13
      }
    }
  },
  {
    // get messages in a public chatroom
    method: 'GET',
    url: config.api.communication.chatrooms.getPublicMessages(1, 10),
    response: {
      'code' : 200,
      'status' : 'OK',
      'data' : [
        {
          'id': '63dc9f59-a579-4b69-a80c-a3c48d794f46',
          'sender' : {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f16',
            'name' : 'Priagung Satyagama',
            'avatar' : 'https://dummyimage.com/600x400/000/fff'
          },
          'text' : 'Lorem ipsum dolor sit amet, consectetur adipiscing',
          'time' : 1561500940093,
        },
        {
          'id': '63dc9f59-a579-4b69-a80c-a3c48d794f26',
          'sender' : {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f33',
            'name' : 'Ricky Kennedy',
            'avatar' : 'https://dummyimage.com/600x400/000/ff0'
          },
          'text' : 'Ini Last Message',
          'time' : 1561500940093,
        }
      ],
      'paging' : {
        'page' : 1,
        'size' : 12,
        'totalRecords' : 13
      }
    }
  },
  {
    //create a chatroom
    method: 'POST',
    url: config.api.communication.chatrooms.create,
    response: {
      'code' : 200,
      'status' : 'OK',
      'data' : {
        'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f22',
        'name' : 'Tim Future Bandung',
        'members' : [
          {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f16',
            'name' : 'Priagung Satyagama',
            'avatar' : 'https://dummyimage.com/600x400/000/ff0',
            'university' : 'Institut Teknologi Bandung',
            'batch': {
              'id': 'sample-id',
              'name': 'Batch Name',
              'code': '3'
            },
            'type' : 'STUDENT'
          },
          {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f17',
            'name' : 'Ricky Kennedy',
            'avatar' : 'https://dummyimage.com/600x400/000/ff0',
            'university' : 'Institut Teknologi Bandung',
            'batch': {
              'id': 'sample-id',
              'name': 'Batch Name',
              'code': '3'
            },
            'type' : 'STUDENT'
          },
          {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f15',
            'name' : 'Felix Wimpy W',
            'avatar' : 'https://dummyimage.com/600x400/000/ff0',
            'university' : null,
            'batch' : null,
            'type' : 'MENTOR'
          }
        ]
      }
    }
  },
  {
    //create message
    method: 'POST',
    url: config.api.communication.chatrooms.createMessage('63dc9f59-a579-4b69-a80c-a3c48d794f22'),
    response: {
      'code' : 201,
      'status' : 'CREATED'
    }
  },
  {
    // update chatroom
    method: 'PUT',
    url: config.api.communication.chatrooms.update('63dc9f59-a579-4b69-a80c-a3c48d794f22'),
    response: {
      'code' : 200,
      'status' : 'OK',
      'data' : {
        'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f22',
        'name' : 'Tim Future Bandung',
        'members' : [
          {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f16',
            'name' : 'Priagung Satyagama',
            'avatar' : 'https://dummyimage.com/600x400/000/ff0',
            'university' : 'Institut Teknologi Bandung',
            'batch': {
              'id': 'sample-id',
              'name': 'Batch Name',
              'code': '3'
            },
            'type' : 'STUDENT'
          },
          {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f17',
            'name' : 'Ricky Kennedy',
            'avatar' : 'https://dummyimage.com/600x400/000/ff0',
            'university' : 'Institut Teknologi Bandung',
            'batch': {
              'id': 'sample-id',
              'name': 'Batch Name',
              'code': '3'
            },
            'type' : 'STUDENT'
          },
          {
            'id' : '63dc9f59-a579-4b69-a80c-a3c48d794f15',
            'name' : 'Felix Wimpy W',
            'avatar' : 'https://dummyimage.com/600x400/000/ff0',
            'university' : null,
            'batch' : null,
            'type' : 'MENTOR'
          }
        ]
      }
    }
  },
  {
    //update seen status on a chatroom
    method: 'PUT',
    url: config.api.communication.chatrooms.updateReadStatus('63dc9f59-a579-4b69-a80c-a3c48d794f22', '63dc9f59-a579-4b69-a80c-a3c48d794f26'),
    response: {
      'code' : 200,
      'status' : 'OK'
    }
  }
]

export const myQuestionnaires = [
  {
    // get my questionnaire
    method: 'GET',
    url: config.api.communication.myQuestionnaire.getMyquestionnnaires(1, 10),
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': '5d2352f94534202434730f2a',
          'title': 'future batch 3',
          'description': 'future 3 bootcamp questionnaire',
          'startDate': 1562596044000,
          'dueDate': 1562682444000
        },
        {
          'id': '5d2352f94534202434730f2b',
          'title': 'future batch 3',
          'description': 'future 3 bootcamp questionnaire',
          'startDate': 1562596044000,
          'dueDate': 1562682444000
        },
        {
          'id': '5d2352f94534202434730f2c',
          'title': 'future batch 3',
          'description': 'future 3 bootcamp questionnaire',
          'startDate': 1562596044000,
          'dueDate': 15626824440000
        }
      ],
      'paging': {
        'page': 1,
        'size': 10,
        'totalRecord': 3
      }
    }
  }
]
