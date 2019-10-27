import Icon from '@/components/editor/Icon'
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder,
  Image,
  TrailingNode
} from 'tiptap-extensions'

export default {
  name: 'editor',
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
    Icon
  },
  props: [ 'value', 'placeholder', 'label' ],
  mounted () {
    this.editor = new Editor({
      onUpdate: ({ getHTML }) => {
        this.editorChange = true
        this.$emit('input', getHTML())
      },
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Placeholder({
          emptyNodeClass: 'is-empty',
          emptyNodeText: this.placeholder,
          showOnlyWhenEditable: true
        }),
        new Image(),
        new TrailingNode({
          node: 'paragraph',
          notAfter: ['paragraph']
        })
      ],
      content: this.value
    })
  },
  data () {
    return {
      editor: null,
      editorChange: false,
      linkUrl: null,
      linkMenuIsActive: false
    }
  },
  methods: {
    showLinkMenu (attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu () {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl (command, url) {
      command({ href: url })
      this.hideLinkMenu()
    },
    showImagePrompt (command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
        this.$emit('imgUpload', { src: this.src })
      }
    }
  },
  watch: {
    value (val) {
      if (this.editor && !this.editorChange) {
        this.editor.setContent(val, true)
      }
      this.editorChange = false
    }
  },
  beforeDestroy () {
    if (this.editor) {
      this.editor.destroy()
    }
  }
}
