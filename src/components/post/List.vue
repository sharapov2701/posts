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
import type { Post } from '@/types/post'
import * as data from '@/assets/data.json'

const pageSize: number = 10

const page = ref<number>(1)

const posts = computed<Post[]>(() => data.posts)
const displayedPosts = computed(() =>
  posts.value.slice((page.value - 1) * pageSize, page.value * pageSize),
)
const pagesTotal = computed(() => Math.floor(posts.value.length / pageSize) || 1)
</script>
