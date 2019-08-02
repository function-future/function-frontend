import logMessage from '@/views/LoggingRoom/LogMessage'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'log-message-room',
  components: {
    logMessage,
    InfiniteLoading
  },
  props: {
    title: {
      type: String,
      default: 'Future Batch 3 Progress'
    },
    logMessages: {
      type: Array,
      default: function () {
        return [{
          'id': '5d42fd3939b20f0ea4f477ee',
          'text': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
          'createdAt': 1564671289167,
          'senderName': 'tzuyu',
          'senderAvatar': 'http://localhost:8080/api/core/resources/user/c534d853-625d-49e0-a74f-29d9eede0552-thumbnail.jpg'
        }]
      }
    }
  }
}
