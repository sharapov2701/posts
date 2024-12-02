<template>
  <v-card class="mx-auto" max-width="800">
    <v-toolbar>
      <v-toolbar-title>Лента</v-toolbar-title>

      <v-spacer />

      <v-btn icon="mdi-magnify" variant="text" />
    </v-toolbar>

    <v-list :items="displayedPosts" lines="three" item-props>
      <template #subtitle="{ item }">
        {{ item.name }}
      </template>
    </v-list>

    <v-pagination v-model="page" :length="pagesTotal" />
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { usePostStore } from '@/stores/post'

const postStore = usePostStore()
const { posts } = storeToRefs(postStore)

const page = ref<number>(1)
const pageSize = ref<number>(10)

const displayedPosts = computed(() =>
  posts.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value),
)
const pagesTotal = computed(() => Math.floor(posts.value.length / pageSize.value) || 1)
</script>
