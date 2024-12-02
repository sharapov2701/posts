<script setup lang="ts">
import { usePostStore } from '@/stores/post'

const { addPost } = usePostStore()

const postName = ref<string>('')
const isDialogOpen = ref<boolean>(false)

function savePost() {
  addPost({ name: postName.value })
  closeDialog()
}

function closeDialog() {
  isDialogOpen.value = false
}
</script>

<template>
  <v-dialog v-model="isDialogOpen" max-width="500">
    <template #activator="{ props: activatorProps }">
      <v-fab
        class="position-sticky"
        v-bind="activatorProps"
        app
        color="green"
        icon="mdi-plus"
        location="bottom right"
      />
    </template>

    <v-card title="Новый пост">
      <v-textarea
        ref="textarea"
        v-model:model-value="postName"
        class="mx-2"
        rows="2"
        auto-grow
        variant="outlined"
      />

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="blue" variant="outlined" @click.stop="closeDialog"> Отмена </v-btn>
        <v-btn color="blue" variant="flat" :disabled="!postName" @click.stop="savePost">
          Опубликовать
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
