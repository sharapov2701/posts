<script setup lang="ts">
import type { Post } from '@/types/post'
import { usePostStore } from '@/stores/post'

interface PostProps {
  post: Post
}

const props = defineProps<PostProps>()

const { editPost } = usePostStore()
const textarea = useTemplateRef('textarea')

const isEditing = ref<boolean>(false)
const isFocused = ref<boolean>(false)
const postName = ref<Post['name']>(props.post.name)

const isSavingDisabled = computed<boolean>(() => props.post.name === postName.value)

function focusPost() {
  if (!isFocused.value) {
    isFocused.value = true
  }
}

function blurPost() {
  nextTick(() => (isFocused.value = false))
}

function focusTextarea() {
  textarea.value.focus()
}

function startEditing() {
  isEditing.value = true
  focusTextarea()
}

function stopEditing() {
  isEditing.value = false
}

function cancelEditing() {
  postName.value = props.post.name
  stopEditing()
}

function save() {
  editPost({
    id: props.post.id,
    name: postName.value,
  })
  stopEditing()
}
</script>

<template>
  <v-hover>
    <template #default="{ isHovering, props: hoverProps }">
      <v-list-item
        v-bind="hoverProps"
        active-color="gray"
        :active="isEditing || isFocused || isHovering"
        @click="focusPost"
        @blur="blurPost"
      >
        <v-form @submit.prevent>
          <v-textarea
            ref="textarea"
            v-model:model-value="postName"
            rows="2"
            auto-grow
            variant="plain"
            :label="post.id"
            :readonly="!isEditing"
            @blur="blurPost"
          />

          <v-btn class="mr-2" @click.stop="isEditing ? cancelEditing() : startEditing()">
            <span v-if="isEditing"> Отмена </span>
            <v-icon v-else icon="mdi-pencil" />
          </v-btn>

          <v-btn
            v-if="isEditing"
            type="submit"
            color="blue"
            :disabled="isSavingDisabled"
            @click.stop="save"
          >
            Сохранить
          </v-btn>
        </v-form>
      </v-list-item>
    </template>
  </v-hover>
</template>
