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
const postName = ref<Post['name']>(props.post.name)

const isSavingDisabled = computed<boolean>(() => props.post.name === postName.value)

function startEditing() {
  isEditing.value = true
  textarea.value.focus()
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
  <v-form @submit.prevent>
    <v-textarea
      ref="textarea"
      v-model:model-value="postName"
      rows="2"
      no-resize
      variant="plain"
      :label="post.id"
      :readonly="!isEditing"
    />

    <v-btn class="mr-2" @click="isEditing ? cancelEditing() : startEditing()">
      <span v-if="isEditing"> Отмена </span>
      <v-icon v-else icon="mdi-pencil" />
    </v-btn>

    <v-btn v-if="isEditing" type="submit" color="blue" :disabled="isSavingDisabled" @click="save">
      Сохранить
    </v-btn>
  </v-form>
</template>
