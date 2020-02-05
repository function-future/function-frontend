import Icon from '@/components/editor/Icon'
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
import { mapActions, mapGetters } from 'vuex'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
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
  props: [ 'value', 'placeholder', 'label', 'upload' ],
  mounted () {
    this.editor = new Editor({
      onUpdate: ({ getHTML }) => {
        this.editorChange = true
        let html = getHTML()
        if (html === '<p></p>') html = ''
        this.$emit('input', html)
      },
      onFocus: () => { this.hideBottomNavBar() },
      onBlur: () => { this.showBottomNavBar() },
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
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
      linkMenuIsActive: false,
      file: null,
      imageCommand: null,
      imagebubble: false
    }
  },
  computed: {
    ...mapGetters([
      'bottomNavBarVisible'
    ])
  },
  methods: {
    ...mapActions([
      'showBottomNavBar',
      'hideBottomNavBar'
    ]),
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
      }
    },
    onFileChange (command) {
      this.imageCommand = command
      this.file = this.$refs.file.files[0]
      this.$emit('imgUpload', this.file)
    },
    addImage (src) {
      if (this.src !== null) {
        const command = this.imageCommand
        command({ src })
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
