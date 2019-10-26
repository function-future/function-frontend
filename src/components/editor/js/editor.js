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
  Placeholder
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
        })
      ],
      content: this.value
    })
  },
  data () {
    return {
      editor: null,
      editorChange: false
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
