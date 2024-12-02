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
  textarea.value?.focus()
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
        class="mx-2"
        v-bind="hoverProps"
        color="gray"
        variant="tonal"
        :ripple="false"
        :active="isEditing || isFocused || !!isHovering"
        @blur="blurPost"
        @click="focusPost"
      >
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

        <div class="d-flex">
          <v-btn
            v-if="isEditing"
            class="mr-2"
            color="blue"
            variant="outlined"
            @click.stop="cancelEditing"
          >
            Отмена
            <v-icon icon="mdi-cancel" end />
          </v-btn>

          <v-btn v-else class="mr-2" @click.stop="startEditing">
            Редактировать
            <v-icon icon="mdi-pencil" end />
          </v-btn>

          <v-btn
            v-if="isEditing"
            color="blue"
            variant="flat"
            :disabled="isSavingDisabled"
            @click.stop="save"
          >
            Сохранить
            <v-icon icon="mdi-content-save" end />
          </v-btn>

          <post-deletion class="ml-auto" :post-id="post.id" />
        </div>
      </v-list-item>
    </template>
  </v-hover>
</template>
