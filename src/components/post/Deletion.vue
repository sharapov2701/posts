<script setup lang="ts">
import type { Post } from '@/types/post'
import { usePostStore } from '@/stores/post'

interface PostDeletionProps {
  postId: Post['id']
}

const props = defineProps<PostDeletionProps>()

const { deletePost } = usePostStore()

const isActive = ref<boolean>(false)

function closeDialog() {
  isActive.value = false
}

function confirmDeletion() {
  deletePost(props.postId)
  closeDialog()
}
</script>

<template>
  <div>
    <v-dialog v-model="isActive" max-width="500">
      <template #activator="{ props: activatorProps }">
        <v-btn v-bind="{ ...$attrs, ...activatorProps }" color="red" variant="outlined" @click.stop>
          Удалить
          <v-icon icon="mdi-delete" end />
        </v-btn>
      </template>

      <v-card title="Внимание">
        <v-card-text> Вы действительно хотите удалить этот пост? </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" variant="outlined" @click="closeDialog">Отмена</v-btn>
          <v-btn color="red" variant="flat" @click="confirmDeletion">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
