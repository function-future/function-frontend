<template>
  <div>
    <div class="label">{{label}}</div>
    <div class="editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold">
            <icon name="bold" />
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic">
            <icon name="italic" />
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike">
            <icon name="strikethrough" />
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline">
            <icon name="underline" />
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code">
            <icon name="code" />
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph">
            <icon name="paragraph" />
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })">
            H1
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })">
            H2
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })">
            H3
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list">
            <icon name="list-ul" />
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list">
            <icon name="list-ol" />
          </button>
          <button
            class="menubar__button imagebubble-button"
            @click="imagebubble = true">
            <icon name="image" />
            <div class="imagebubble"
                 :class="{ 'is-active': imagebubble }"
                 @mouseleave="imagebubble = false">
              <input type="file"
                     name="image"
                     id="image-upload"
                     accept=".jpg, .jpeg, .png"
                     ref="file"
                     @change="onFileChange(commands.image)"
                     style="display: none"/>
              <label class="imagebubble-menu" for="image-upload">
                <icon name="upload" />
                <span>Upload Image</span>
              </label>
              <div class="imagebubble-menu" @click="showImagePrompt(commands.image)">
                <icon name="copy" />
                <span>Paste Link</span>
              </div>
            </div>
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote">
            <icon name="quote-right" />
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block">
            <icon name="code" />
          </button>
          <button
            class="menubar__button"
            @click="commands.horizontal_rule">
            <icon name="grip-lines" />
          </button>
          <button
            class="menubar__button"
            @click="commands.undo">
            <icon name="undo" />
          </button>
          <button
            class="menubar__button"
            @click="commands.redo">
            <icon name="redo" />
          </button>
        </div>
      </editor-menu-bar>
      <editor-menu-bubble :editor="editor" v-slot="{ commands, isActive, getMarkAttrs, menu }">
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">
          <form class="menububble__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
            <input class="menububble__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu"/>
            <button class="menububble__button" @click="setLinkUrl(commands.link, null)" type="button">
              <icon name="times-circle" />
            </button>
          </form>
          <template v-if="!linkMenuIsActive">
            <button
              class="menububble__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold">
              <icon name="bold" />
            </button>
            <button
              class="menububble__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic">
              <icon name="italic" />
            </button>
            <button
              class="menububble__button"
              :class="{ 'is-active': isActive.code() }"
              @click="commands.code">
              <icon name="code" />
            </button>
            <button
              class="menububble__button"
              @click="showLinkMenu(getMarkAttrs('link'))"
              :class="{ 'is-active': isActive.link() }">
              <span class="menububble-text">{{ isActive.link() ? 'Update Link' : 'Add Link'}}</span>
              <icon name="link" />
            </button>
          </template>
        </div>
      </editor-menu-bubble>
      <editor-content class="editor__content content" autoFocus :editor="editor"/>
    </div>
  </div>
</template>

<script src="./js/editor.js"></script>




<style lang="scss" scoped>
  .menubar {
    transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 0.5rem 0;

    &__button {
      background-color: #FFFFFF;
      border: none;
      align-items: center;
      display: flex;
      margin: 0.25rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      outline: none;
      cursor: pointer;
      font-weight: bold;

      &:hover {
        background-color: rgba(0,0,0,.05);
      }

      &:active {
        outline: none;
      }
    }

    .is-active {
      background-color: rgba(0,0,0,.1);
    }
  }

  /deep/ {
    .ProseMirror {
      min-height: 10rem;

      &:focus {
        outline: none !important;
      }
    }

    p.is-empty:first-child::before {
      content: attr(data-empty-text);
      float: left;
      color: #aaa;
      font-size: 1rem;
      pointer-events: none;
      height: 0;
    }

    .editor {
      border-radius: 4px;
      border: 1px solid #dbdbdb;
      padding: 0.25rem 0.5rem 0.5rem 0.5rem;

      &__content {
        padding: 0.5rem;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        min-height: 10rem;

        * {
          caret-color: currentColor;
        }

        pre {
          padding: 0.7rem 1rem;
          border-radius: 5px;
          background: #000000;
          color: #FFFFFF;
          font-size: 0.8rem;
          overflow-x: auto;
          white-space: pre-wrap;

          code {
            display: block;
          }
        }

        p code {
          display: inline-block;
          padding: 0 0.4rem;
          border-radius: 5px;
          font-size: 0.8rem;
          font-weight: bold;
          background: rgba(0, 0, 0, 0.1);
          color: rgba(0, 0, 0, 0.8);
        }

        ul,
        ol {
          padding-left: 1rem;
        }

        li > p,
        li > ol,
        li > ul {
          margin: 0;
        }

        a {
          color: inherit;
          text-decoration: underline !important;
        }

        blockquote {
          border-left: 3px solid rgba(0, 0, 0, 0.1);
          color: rgba(0, 0, 0, 0.8);
          padding-left: 0.8rem;
          font-style: italic;

          p {
            margin: 0;
          }
        }

        img {
          max-width: 100%;
          border-radius: 3px;
        }

        table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 0;
          overflow: hidden;

          td, th {
            min-width: 1em;
            border: 2px solid #7f7f7f;
            padding: 3px 5px;
            vertical-align: top;
            box-sizing: border-box;
            position: relative;
            > * {
              margin-bottom: 0;
            }
          }

          th {
            font-weight: bold;
            text-align: left;
          }

          .selectedCell:after {
            z-index: 2;
            position: absolute;
            content: "";
            left: 0; right: 0; top: 0; bottom: 0;
            background: rgba(200, 200, 255, 0.4);
            pointer-events: none;
          }

          .column-resize-handle {
            position: absolute;
            right: -2px; top: 0; bottom: 0;
            width: 4px;
            z-index: 20;
            background-color: #adf;
            pointer-events: none;
          }
        }

        .tableWrapper {
          margin: 1em 0;
          overflow-x: auto;
        }

        .resize-cursor {
          cursor: ew-resize;
          cursor: col-resize;
        }
      }
    }
  }

  .menububble {
    position: absolute;
    display: flex;
    z-index: 50;
    background: #000000;
    border-radius: 5px;
    padding: 0.3rem;
    margin-bottom: 0.5rem;
    transform: translateX(-50%);
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;

    &.is-active {
      opacity: 1;
      visibility: visible;
    }

    &-text {
      margin-right: 0.3rem;
    }

    &__button {
      display: inline-flex;
      background: transparent;
      border: 0;
      color: #FFFFFF;
      padding: 0.2rem 0.5rem;
      margin-right: 0.2rem;
      border-radius: 3px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        background-color: rgba(#FFFFFF, 0.1);
      }

      &.is-active {
        background-color: rgba(#FFFFFF, 0.2);
      }
    }

    &__form {
      display: flex;
      align-items: center;
    }

    &__input {
      font: inherit;
      border: none;
      background: transparent;
      color: #FFFFFF;

      &:focus {
        outline: none;
      }
    }
  }

  .imagebubble {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 110px;
    z-index: 50;
    top: 25px;
    left: 0;
    border-radius: 5px;
    padding: 0.2rem;
    color: #FFFFFF;
    background-color: #000000;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
    font-size: 0.5rem;

    &.is-active {
      background-color: #000000;
      opacity: 1;
      visibility: visible;
    }

    &-button {
      position: relative;
    }

    &-menu {
      display: flex;
      text-align: left;
      cursor: pointer;
      padding: 0.5rem;

      span {
        margin-left: 0.3rem;
      }

      &:hover {
        background-color: rgba(#FFFFFF, 0.1);
      }
    }
  }
</style>
